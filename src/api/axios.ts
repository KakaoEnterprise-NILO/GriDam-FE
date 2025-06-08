import axios, { AxiosRequestConfig } from "axios";

// ✅ axios 인스턴스 생성
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ 요청 보낼 때 accessToken 자동 설정
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ 응답 인터셉터: accessToken 만료 시 refreshToken으로 갱신
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.warn("🔑 refreshToken 없음. 재로그인 필요");
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // ✅ 수정 코드 (accessToken도 함께 보냄)
        const { data } = await axios.post("/api/auth/reissue", {
          accessToken: localStorage.getItem("accessToken"),
          refreshToken,
        });

        const newAccessToken = data.result.accessToken;
        const newRefreshToken = data.result.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (reissueError) {
        console.error("🔴 토큰 재발급 실패:", reissueError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(reissueError);
      }
    }

    console.error("❌ 요청 실패:", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export default api;
