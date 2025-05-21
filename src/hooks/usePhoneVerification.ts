// ✅ src/hooks/usePhoneVerification.ts
import { useState } from "react";
import { sendSmsCode, verifySmsCode } from "@/api/auth";

export function usePhoneVerification() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthSent, setIsAuthSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [message, setMessage] = useState("");

  const sendCode = async (phoneNum: string) => {
    setIsLoading(true);
    try {
      const { data } = await sendSmsCode(phoneNum);
      if (data.success) {
        setMessage("인증번호가 전송되었습니다.");
        setIsAuthSent(true);
      } else {
        setMessage("인증번호 전송 실패");
      }
    } catch (e) {
      setMessage("에러 발생");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyCode = async (phoneNum: string, code: string) => {
    setIsLoading(true);
    try {
      const { data } = await verifySmsCode(phoneNum, code);
      if (data.success) {
        setIsVerified(true);
        setIsAuthSent(false);
        setMessage("인증 성공");
      } else {
        setMessage("인증 실패");
      }
    } catch (e) {
      setMessage("에러 발생");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isAuthSent,
    isVerified,
    message,
    sendCode,
    verifyCode,
  };
}
