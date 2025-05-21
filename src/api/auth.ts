// ✅ src/api/auth.ts
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
  api.post("/auth/login", data);
