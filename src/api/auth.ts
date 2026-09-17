import type { ApiResponse } from "@/services/notificationService";
import api from "./axios";


//인증번호 전송 POST 요청
export const sendSmsCode = (phoneNum: string) =>
  api.post("/auth/sms/send", { phoneNum });

//인증번호 확인 POST 요청
export const verifySmsCode = (phoneNum: string, certificationCode: string) =>
  api.post("/auth/sms/verify", { phoneNum, certificationCode });


//회원가입 POST 요청
export const signUp = (data: {
  loginId: string;
  password: string;
  checkPassword: string;
  nickname: string;
  phoneNum: string;
  auth: boolean;
}) => api.post("/auth/signup", data);

//로그인 POST 요청
export const login = (data: { loginId: string; password: string }) =>
  api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>("/auth/login", data);


//로그아웃 POST 요청
export const logout = async (accessToken: string) => {
  return api.post('/auth/logout', { accessToken });
};
