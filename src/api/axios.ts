// src/api/axios.ts
import axios, { AxiosRequestConfig } from "axios";


// // ✅ axios 인스턴스 생성
// const api = axios.create({
//   // 주소
//   baseURL: "https://gridam.store/api",

//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// ✅ axios 인스턴스 생성 **개발용**

const api = axios.create({
  // 주소
  // baseURL: "http://158.180.70.205:8080/api",
  baseURL: "https://gridam.store/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// // ✅ axios 인스턴스 생성 **개발용**
// const api = axios.create({

//   // baseURL: "http://158.180.70.205:8080/api",
//   baseURL: "/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

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

    // 401 에러 && 아직 재시도 안 했을 때
    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        console.warn("refreshToken 없음. 로그아웃 필요");
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const { data } = await axios.post("/api/auth/reissue", {
          refreshToken,
        });

        const newAccessToken = data.accessToken;
        const newRefreshToken = data.refreshToken;

        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 원래 요청 재시도
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (reissueError) {
        console.error("🔴 토큰 재발급 실패:", reissueError);

        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // window.location.href = "/login"; // 필요 시 활성화
        return Promise.reject(reissueError);
      }
    }

    // ✅ 추가 디버깅 로그 (선택적)
    console.error("❌ 요청 실패:", error.response?.status, error.response?.data);

    return Promise.reject(error);
  }
);

export default api;