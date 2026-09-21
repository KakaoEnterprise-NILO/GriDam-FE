import type { ApiResponse } from "@/services/notificationService";
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
// Refresh requests must not enter the authentication interceptors.
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
        // A completed logout or a different login must not be overwritten.
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

      // A late 401 for the previous token can reuse an already rotated token.
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
