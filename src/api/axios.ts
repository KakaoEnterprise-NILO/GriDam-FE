// src/api/axios.ts
import axios from "axios";

// ✅ axios 인스턴스 생성
const api = axios.create({
  baseURL: "/api", // ✅ 기본 URL 설정
  headers: {
    "Content-Type": "application/json", // ✅ JSON 형식으로 데이터를 보낼 것임을 명시
  },
  withCredentials: true, // ✅ 쿠키 등 인증 정보를 함께 보냄
});


// ✅ 요청 보낼 때 자동으로 accessToken 헤더에 넣기
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// // ✅ 응답 인터셉터: accessToken 만료 시 refreshToken으로 갱신
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     // 401 에러 && 재시도하지 않은 요청이면
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await axios.post("/api/auth/reissue", {
//           refreshToken: localStorage.getItem("refreshToken"),
//         });

//         const newAccessToken = data.accessToken;
//         const newRefreshToken = data.refreshToken;

//         // ✅ 새 토큰 저장
//         localStorage.setItem("accessToken", newAccessToken);
//         localStorage.setItem("refreshToken", newRefreshToken);

//         // ✅ 원래 요청 재시도
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return api(originalRequest);
//       } catch (reissueError) {
//         // refreshToken 만료 시 → 로그아웃 처리
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
        
//         // 디버깅용: 바로 리다이렉션하지 않고 에러 로그 남기기
//         console.error("토큰 재발급 실패", reissueError);
//         // window.location.href = "/login"; // 이 줄 주석 처리
//         return Promise.reject(reissueError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;