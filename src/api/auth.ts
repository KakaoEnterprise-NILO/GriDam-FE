import type { ApiResponse } from "@/api/types";
import api from "./axios";

export const sendSmsCode = (phoneNum: string) =>
  api.post("/auth/sms/send", { phoneNum });

export const verifySmsCode = (phoneNum: string, certificationCode: string) =>
  api.post("/auth/sms/verify", { phoneNum, certificationCode });


export const signUp = (data: {
  loginId: string;
  password: string;
  checkPassword: string;
  nickname: string;
  phoneNum: string;
  auth: boolean;
}) => api.post("/auth/signup", data);

export const login = (data: { loginId: string; password: string }) =>
  api.post<ApiResponse<{ accessToken: string; refreshToken: string }>>("/auth/login", data);


export const logout = async (accessToken: string) => {
  return api.post('/auth/logout', { accessToken });
};
