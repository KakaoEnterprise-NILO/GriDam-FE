import type { ApiResponse } from "@/api/types";
import axios, { type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/store/authStore";

export type ApiErrorResponse = Partial<Pick<ApiResponse<unknown>, "message" | "code" | "result">>;

type RetryRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean };
type AuthTokens = { accessToken: string; refreshToken: string };

const clientConfig = {
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
};

const api = axios.create(clientConfig);
// 토큰 갱신 요청은 인증 인터셉터를 거치지 않도록 별도 클라이언트를 사용한다.
const refreshApi = axios.create(clientConfig);
let refreshPromise: Promise<AuthTokens> | null = null;

function refreshTokens(refreshToken: string): Promise<AuthTokens> {
  if (!refreshPromise) {
    const accessToken = useAuthStore.getState().accessToken;
    refreshPromise = refreshApi
      .post<AuthTokens>("/auth/reissue", { refreshToken }, {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
      })
      .then(({ data }) => {
        // 로그아웃이 완료되었거나 다른 로그인이 시작된 경우 기존 인증 상태를 덮어쓰지 않는다.
        if (useAuthStore.getState().refreshToken !== refreshToken) {
          throw new Error("Authentication changed during token refresh.");
        }
        useAuthStore.getState().setTokens(data);
        return data;
      })
      .catch((error: unknown) => {
        console.error("Token refresh failed.");
        if (useAuthStore.getState().refreshToken === refreshToken) {
          useAuthStore.getState().clearAuth();
        }
        throw error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: unknown) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const originalRequest = error.config as RetryRequestConfig | undefined;
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      const { accessToken, refreshToken } = useAuthStore.getState();
      if (!refreshToken) return Promise.reject(error);

      originalRequest._retry = true;

      // 이전 토큰에 대한 늦은 401 응답은 이미 갱신된 토큰을 재사용할 수 있다.
      const tokens = refreshPromise
        ? await refreshPromise
        : accessToken && originalRequest.headers.Authorization !== `Bearer ${accessToken}`
          ? { accessToken, refreshToken }
          : await refreshTokens(refreshToken);

      if (useAuthStore.getState().refreshToken !== tokens.refreshToken) {
        return Promise.reject(error);
      }
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;
      return api(originalRequest);
    }

    console.error("Request failed:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
