import { useState } from "react";
import { isAxiosError } from "axios";
import { useLocation, useNavigate } from "react-router-dom";

import api, { type ApiErrorResponse } from "@/api/axios";
import { useAuth } from "@/hooks/useAuth";

type LoginLocationState = {
  from?: { pathname?: string; search?: string; hash?: string }
}


export function useLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginUser } = useAuth();

  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("")

  const getReturnPath = () => {
    const state = location.state as LoginLocationState | null
    const from = state?.from
    if (!from?.pathname || !from.pathname.startsWith("/")) return "/"
    return `${from.pathname}${from.search ?? ""}${from.hash ?? ""}`
  }

  const handleLogin = async () => {
    setErrorMsg("");

    if (!loginId.trim() || !password.trim()) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await loginUser({ loginId, password });
      navigate(getReturnPath(), { replace: true });
    } catch (error: unknown) {
      const response = isAxiosError<ApiErrorResponse>(error)
        ? error.response
        : undefined;

      if (response) {
        const message = response.data.message || "";

        setErrorMsg(
          message === "서버 에러, 관리자에게 문의 바랍니다."
            ? "아이디가 맞지 않습니다."
            : message,
        );
      } else {
        setErrorMsg("서버와 연결할 수 없습니다.");
      }
    }
  };

  const handleSocialLogin = async (provider: "kakao" | "naver") => {
    try {
      const response = await api.get(`/auth/login/uri/${provider}`);
      window.location.href = response.data;
    } catch (error) {
      console.error(`${provider} 로그인 오류`, error);
      setErrorMsg("소셜 로그인 중 오류가 발생했습니다.");
    }
  };

  return {
    loginId,
    password,
    isRemembered,
    errorMsg,
    setLoginId,
    setPassword,
    setIsRemembered,
    handleLogin,
    handleSocialLogin,
    navigate,
  };
}
