import type { ApiResponse } from "@/services/notificationService";
import axios, { AxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";


export type ApiErrorResponse = Partial<Pick<ApiResponse<unknown>, "message" | "code" | "result">>;

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { data } = await api.post("/auth/reissue", { refreshToken }, { _retry: true } as AxiosRequestConfig & { _retry?: boolean });

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;
        useAuthStore.getState().setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (reissueError) {
        console.error("토큰 재발급 실패:", reissueError);
        useAuthStore.getState().clearAuth();

        return Promise.reject(reissueError);
      }
    }

    console.error("요청 실패:", error.response?.status, error.response?.data);

    return Promise.reject(error);
  }
);

export default api;
