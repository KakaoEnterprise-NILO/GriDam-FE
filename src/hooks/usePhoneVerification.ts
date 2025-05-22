// ✅ src/hooks/usePhoneVerification.ts
import { useState } from "react";
import { sendSmsCode, verifySmsCode } from "@/api/auth";

export function usePhoneVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");

  // 🔸 에러 핸들링 유틸
  const handleError = (error: unknown, fallback = "에러가 발생했습니다.") => {
    console.error("[SMS 인증 오류]", error);
    const msg = error instanceof Error ? error.message : fallback;
    setMessage(msg);
  };

  // 🔹 인증 문자 전송 요청
  const sendCode = async (phoneNum: string) => {
    setIsLoading(true);
    try {
      const { data } = await sendSmsCode(phoneNum); // ✅ 실제 API 형식에 맞춤
      if (data.success) {
        setIsAuthSent(true);
        setMessage(data.message || "인증번호가 전송되었습니다.");
      } else {
        setMessage(data.message || "인증번호 전송 실패");
      }
    } catch (e) {
      handleError(e, "인증번호 전송 중 오류 발생");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 인증 코드 검증 요청
  const verifyCode = async (phoneNum: string, certificationCode: string) => {
    setIsLoading(true);
    try {
      const { data } = await verifySmsCode(phoneNum, certificationCode); // ✅ 실제 API 형식에 맞춤
      if (data.success) {
        setIsVerified(true);
        setIsAuthSent(false);
        setMessage(data.message || "인증 성공");
      } else {
        setMessage(data.message || "인증 실패");
      }
    } catch (e) {
      handleError(e, "인증 확인 중 오류 발생");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔸 상태 초기화 함수
  const resetVerification = () => {
    setIsLoading(false);
    setIsAuthSent(false);
    setIsVerified(false);
    setMessage("");
  };

  return {
    isLoading,
    isAuthSent,
    isVerified,
    message,
    sendCode,
    verifyCode,
    resetVerification,
  };
}
