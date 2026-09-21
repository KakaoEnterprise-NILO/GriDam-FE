import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePhoneVerification } from "@/components/login/usePhoneVerification";
export interface RegisterFormData {
  loginId: string;
  password: string;
  checkPassword: string;
  nickname: string;
  phoneNum: string;
  authCode: string;
}
export function useRegisterPage() {
  const [formData, setFormData] = useState<RegisterFormData>({
    loginId: "",
    password: "",
    checkPassword: "",
    nickname: "",
    phoneNum: "",
    authCode: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const phone = usePhoneVerification();
  const { signUpUser } = useAuth();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    const { loginId, password, checkPassword, nickname, phoneNum } = formData;
    if (
      !loginId.trim() ||
      !password.trim() ||
      !checkPassword.trim() ||
      !nickname.trim() ||
      !phoneNum.trim()
    ) {
      setErrorMsg("모든 필드를 입력해주세요.");
      return false;
    }
    if (password !== checkPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return false;
    }
    if (!phone.isVerified) {
      setErrorMsg("전화번호 인증을 완료해주세요.");
      return false;
    }
    setErrorMsg("");
    return true;
  };
  const handleSignUp = async () => {
    if (!validate()) return;
    setErrorMsg("");
    try {
      const response = await signUpUser({
        ...formData,
        auth: phone.isVerified,
      });
      if (response.success) {
        window.alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else setErrorMsg(response.message || "회원가입 실패가 발생했습니다.");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === "object" &&
              error !== null &&
              "message" in error &&
              typeof error.message === "string"
            ? error.message
            : undefined;
      setErrorMsg(message || "회원가입 중 오류가 발생했습니다.");
    }
  };
  return { formData, errorMsg, handleChange, handleSignUp, navigate, ...phone };
}
