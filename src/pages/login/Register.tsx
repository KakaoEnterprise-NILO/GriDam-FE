import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { usePhoneVerification } from "@/hooks/usePhoneVerification";
import PhoneVerification from "@/components/auth/PhoneVerification";
import GridamLogo from "@/assets/picture/gridam.svg";
import KakaoLogo from "@/assets/picture/login/kakao_login_logo.svg";
import NaverLogo from "@/assets/picture/login/naver_login.logo.svg";
import GrayFooter from "@/components/common/GrayFooter";

interface FormData {
  loginId: string;
  password: string;
  checkPassword: string;
  nickname: string;
  phoneNum: string;
  authCode: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    loginId: "",
    password: "",
    checkPassword: "",
    nickname: "",
    phoneNum: "",
    authCode: "",
  });

  const [errorMsg, setErrorMsg] = useState<string>("");

  const navigate = useNavigate();
  const { isLoading, isAuthSent, isVerified, message, sendCode, verifyCode } = usePhoneVerification();
  const { signUpUser } = useAuth();

  // 폼 데이터 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 유효성 검사 함수
  const validateForm = (): boolean => {
    const { loginId, password, checkPassword, nickname, phoneNum } = formData;

    if (!loginId.trim() || !password.trim() || !checkPassword.trim() || !nickname.trim() || !phoneNum.trim()) {
      setErrorMsg("모든 필드를 입력해주세요.");
      return false;
    }

    if (password !== checkPassword) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return false;
    }

    //임시로 인증 체크 무시
    // if (!isVerified) {
    //   setErrorMsg("전화번호 인증을 완료해주세요.");
    //   return false;
    // }

    setErrorMsg(""); // 유효성 검사 통과 시 에러 초기화
    return true;
  };

  // 회원가입 핸들러
  const handleSignUp = async () => {
    //일단 인증 무시
    // if (!validateForm()) return;

    setErrorMsg(""); // 시도 전 에러 초기화

    try {
      const res = await signUpUser({
        loginId: formData.loginId,
        password: formData.password,
        checkPassword: formData.checkPassword,
        nickname: formData.nickname,
        phoneNum: formData.phoneNum,
        auth: isVerified,
      });

      if (res.success) {
        alert("회원가입 성공! 로그인 페이지로 이동합니다.");
        navigate("/login");
      } else {
        setErrorMsg(res.message || "회원가입 실패가 발생했습니다.");
      }
    } catch (err: any) {
      setErrorMsg(err.message || "회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center bg-[#F0F3FA]">
      <div className="w-full h-56 bg-[#A8BFFF] rounded-b-2xl"></div>

      <div className="bg-white w-96 p-6 rounded-2xl shadow-lg -mt-28 z-10">
        <div className="flex flex-col items-center mb-4">
          <img src={GridamLogo} alt="Gridam Logo" className="w-30 h-24 mb-2" />
          <h2 className="text-lg font-bold mb-2">회원가입</h2>

          <div className="flex justify-center space-x-4 mb-4">
            <button className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <img src={KakaoLogo} alt="카카오 로그인" className="w-full h-full object-cover" />
            </button>
            <button className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
              <img src={NaverLogo} alt="네이버 로그인" className="w-full h-full object-cover" />
            </button>
          </div>

          <p className="text-center text-gray-500 mb-4">또는</p>
        </div>

        <div className="space-y-3">
          <input
            type="text"
            name="loginId"
            placeholder="아이디"
            value={formData.loginId}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            type="password"
            name="checkPassword"
            placeholder="비밀번호 확인"
            value={formData.checkPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          <input
            type="text"
            name="nickname"
            placeholder="이름"
            value={formData.nickname}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 분리된 PhoneVerification 컴포넌트 */}
          <PhoneVerification
            phoneNum={formData.phoneNum}
            authCode={formData.authCode}
            onPhoneNumChange={handleChange}
            onAuthCodeChange={handleChange}
            isLoading={isLoading}
            isAuthSent={isAuthSent}
            message={message}
            sendCode={sendCode}
            verifyCode={verifyCode}
          />

          {/* 에러 메시지 노출 */}
          {errorMsg && (
            <p className="text-red-600 text-sm mt-2 font-semibold">
              {errorMsg}
            </p>
          )}

          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className={`w-full py-2 mt-4 rounded-lg text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isLoading ? "가입 중..." : "가입하기"}
          </button>
        </div>
      </div>

      <GrayFooter />
    </div>
  );
};

export default Register;