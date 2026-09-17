import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Footer from "@/components/common/Footer";
import GridamLogo from "@/assets/picture/gridam.svg";
import KakaoLogo from "@/assets/picture/login/kakao_login_logo.svg";
import NaverLogo from "@/assets/picture/login/naver_login.logo.svg";
import { useAuth } from "@/hooks/useAuth";
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";

export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const { loginUser } = useAuth();

  const toggleRememberMe = () => setIsRemembered((prev) => !prev);
  const handleNavigateRegister = () => navigate("/register");

  const handleLoginClick = async () => {
    setErrorMsg("");
    if (!loginId.trim() || !password.trim()) {
      setErrorMsg("아이디와 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      await loginUser({ loginId, password });
      navigate("/");
    } catch (error: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(error) ? error.response : undefined
      if (errorResponse) {
        const serverMessage = errorResponse.data.message || "";
        if (serverMessage === "서버 에러, 관리자에게 문의 바랍니다.") {
          setErrorMsg("아이디가 맞지 않습니다.");
        } else {
          setErrorMsg(serverMessage);
        }
      } else {
        setErrorMsg("서버와 연결할 수 없습니다.");
      }
    }
  };


  const handleSocialLogin = async (provider: "kakao" | "naver") => {
    try {
      const response = await axios.get(`/api/auth/login/uri/${provider}`);
      window.location.href = response.data;
    } catch (error) {
      console.error(`${provider} 로그인 오류`, error);
      setErrorMsg("소셜 로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-between items-center p-1 bg-[#F0F3FA]">
      <main className="flex flex-col items-center flex-1 scale-90 mt-0">
        <LogoSection />
        <LoginBox
          loginId={loginId}
          setLoginId={setLoginId}
          password={password}
          setPassword={setPassword}
          isRemembered={isRemembered}
          toggleRememberMe={toggleRememberMe}
          errorMsg={errorMsg}
          onLogin={handleLoginClick}
          onNavigateRegister={handleNavigateRegister}
          onSocialClick={handleSocialLogin}
        />
      </main>
      <Footer />
    </div>
  );
}

function LogoSection() {
  return (
    <div className="mb-2">
      <img src={GridamLogo} alt="그리담 로고" className="w-52 h-44" />
    </div>
  );
}

interface LoginBoxProps {
  loginId: string;
  setLoginId: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  isRemembered: boolean;
  toggleRememberMe: () => void;
  errorMsg: string;
  onLogin: () => void;
  onNavigateRegister: () => void;
  onSocialClick: (provider: "kakao" | "naver") => void;
}

function LoginBox({
  loginId,
  setLoginId,
  password,
  setPassword,
  isRemembered,
  toggleRememberMe,
  errorMsg,
  onLogin,
  onNavigateRegister,
  onSocialClick,
}: LoginBoxProps) {
  return (
    <section className="bg-white w-[480px] h-[580px] px-20 py-6 rounded-2xl shadow-lg mb-4">
      <h2 className="text-center text-2xl font-bold mb-4">로그인</h2>

      <SocialLoginButtons onSocialClick={onSocialClick} />

      <p className="text-center text-gray-500 mb-4">or</p>

      <input
        type="text"
        placeholder="아이디 혹은 이메일"
        value={loginId}
        onChange={(e) => setLoginId(e.target.value)}
        className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />

      <RememberMeCheckbox
        isRemembered={isRemembered}
        toggleRememberMe={toggleRememberMe}
      />

      {errorMsg && (
        <p className="text-red-500 text-sm mb-2 font-semibold">{errorMsg}</p>
      )}

      <button
        onClick={onLogin}
        className="w-full py-2 my-8 bg-[#333333] text-white rounded-lg hover:bg-[#444444]"
      >
        로그인
      </button>

      <div className="text-center text-sm text-gray-500 flex justify-center space-x-4">
        <a href="#" className="hover:underline">
          비밀번호 찾기
        </a>
        <span>|</span>
        <button
          className="hover:underline text-gray-500"
          onClick={onNavigateRegister}
          type="button"
        >
          회원가입
        </button>
      </div>
    </section>
  );
}

interface SocialLoginButtonsProps {
  onSocialClick: (provider: "kakao" | "naver") => void;
}

function SocialLoginButtons({ onSocialClick }: SocialLoginButtonsProps) {
  return (
    <div className="flex justify-center space-x-5 mb-4">
      <button
        onClick={() => onSocialClick("kakao")}
        className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
      >
        <img
          src={KakaoLogo}
          alt="카카오 로그인"
          className="w-full h-full object-cover"
        />
      </button>
      <button
        onClick={() => onSocialClick("naver")}
        className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden"
      >
        <img
          src={NaverLogo}
          alt="네이버 로그인"
          className="w-full h-full object-cover"
        />
      </button>
    </div>
  );
}

interface RememberMeCheckboxProps {
  isRemembered: boolean;
  toggleRememberMe: () => void;
}

function RememberMeCheckbox({ isRemembered, toggleRememberMe }: RememberMeCheckboxProps) {
  return (
    <div
      className="flex items-center mb-3 px-3 cursor-pointer select-none"
      onClick={toggleRememberMe}
      role="checkbox"
      aria-checked={isRemembered}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleRememberMe();
        }
      }}
    >
      <div
        className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors duration-300 ${
          isRemembered ? "bg-blue-500" : "bg-gray-300"
        }`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isRemembered ? "translate-x-5" : "translate-x-0"
          }`}
        ></div>
      </div>
      <span className="ml-3 text-sm text-[15px] text-gray-600">로그인 상태 유지</span>
    </div>
  );
}
