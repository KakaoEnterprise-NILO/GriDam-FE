// src/api/axios.ts

import axios from "axios";

const api = axios.create({
  baseURL: "/api", // ✅ 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;