// src/api/axios.ts
import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ✅ 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
   withCredentials: true, // ✅ 이 줄을 추가
});


// 요청 시 JWT 토큰을 Authorization 헤더에 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;