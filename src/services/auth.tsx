import api from "../api/api";

// 인증번호 전송 요청
export const sendAuthCodeRequest = async (phoneNum: string) => {
  const requestBody = { phoneNum };
  console.log("전송할 데이터 (인증번호 요청):", requestBody);

  try {
    const response = await api.post("/auth/sms/send", requestBody);
    console.log("응답 데이터 (인증번호 요청):", response.data);
    return response.data;
  } catch (error: any) {
    console.error("에러 발생 (인증번호 요청):", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

// 인증번호 검증 요청
export const verifyAuthCodeRequest = async (phoneNum: string, certificationCode: string) => {
  const requestBody = { phoneNum, certificationCode };
  console.log("전송할 데이터 (인증번호 검증):", requestBody);

  try {
    const response = await api.post("/auth/sms/verify", requestBody);
    console.log("응답 데이터 (인증번호 검증):", response.data);
    return response.data;
  } catch (error: any) {
    console.error("에러 발생 (인증번호 검증):", error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};
