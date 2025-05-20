import api from "../api/api";

// 회원가입 요청
export const registerUser = async (data: {
  loginId: string;
  password: string;
  checkPassword: string;
  phoneNum: string;
  auth: boolean;
}) => {
  try {
    const response = await api.post("/auth/signup", data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};
