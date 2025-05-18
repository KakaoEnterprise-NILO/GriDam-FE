import axios from "axios";

const api = axios.create({
  baseURL: "http://134.185.101.243:8080/api", // 직접 백엔드 서버 주소를 명시
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
