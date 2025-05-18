import { useState } from "react";
import api from "@/api/axios";
import GrayFooter from "../../components/common/GrayFooter";
import GridamLogo from "../../assets/picture/gridam.svg";
import KakaoLogo from "../../assets/picture/kakao_login_logo.svg";
import NaverLogo from "../../assets/picture/naver_login_logo.svg";

export default function SignUp() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [checkPassword, setCheckPassword] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthSent, setIsAuthSent] = useState(false);

  /**
   * 인증번호 전송 함수
   */
  const handlePhoneAuth = async () => {
    setIsLoading(true);
    setMessage("");

    const requestBody = {
      phoneNum: phoneNum,
    };

    try {
      const response = await api.post("/auth/sms/send", requestBody);
      if (response.data.success) {
        setMessage("인증번호가 전송되었습니다.");
        setIsAuthSent(true);
      } else {
        setMessage("인증번호 전송에 실패했습니다.");
      }
    } catch (error) {
      setMessage("오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 인증번호 검증 함수
   */
  const handleAuthVerify = async () => {
    setIsLoading(true);
    setMessage("");

    const requestBody = {
      phoneNum: phoneNum,
      certificationCode: authCode,
    };

    try {
      const response = await api.post("/auth/sms/verify", requestBody);
      if (response.data.success) {
        setMessage("인증이 완료되었습니다.");
        setAuth(true); 
        setIsAuthSent(false); 
      } else {
        setMessage("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      setMessage("인증 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * 회원가입 함수
   */
  const handleSignUp = async () => {
    if (!auth) {
      setMessage("전화번호 인증이 완료되지 않았습니다.");
      return;
    }

    if (password !== checkPassword) {
      setMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    const requestBody = {
      loginId,
      password,
      checkPassword,
      phoneNum,
      auth: true,
    };

    try {
      const response = await api.post("/auth/signup", requestBody);
      if (response.data.success) {
        setMessage("회원가입이 완료되었습니다.");
      } else {
        setMessage("회원가입에 실패했습니다.");
      }
    } catch (error) {
      setMessage("회원가입 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center bg-[#F0F3FA]">
      {/* 상단 배경 */}
      <div className="w-full h-56 bg-[#A8BFFF] rounded-b-2xl"></div>

      {/* 회원가입 카드 */}
      <div className="bg-white w-96 p-6 rounded-2xl shadow-lg -mt-28 z-10">
        {/* 로고 및 소셜 로그인 */}
        <div className="flex flex-col items-center mb-4">
          <img src={GridamLogo} alt="Gridam Logo" className="w-30 h-24 mb-2" />
          <h2 className="text-lg font-bold mb-2">회원가입</h2>

          {/* 소셜 로그인 */}
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

        {/* 회원가입 폼 */}
        <div className="space-y-3">
          {/* 아이디 */}
          <input
            type="text"
            placeholder="아이디"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 비밀번호 */}
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 비밀번호 확인 */}
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={checkPassword}
            onChange={(e) => setCheckPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 전화번호 및 인증 */}
          <div className="flex space-x-2 mb-3">
            <input
              type="text"
              placeholder="전화번호"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
              className="w-4/5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handlePhoneAuth}
              disabled={isLoading}
              className={`w-1/5 py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
            >
              {isLoading ? "전송" : "인증"}
            </button>
          </div>

          {isAuthSent && (
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                placeholder="인증번호"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value)}
                className="w-4/5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={handleAuthVerify}
                disabled={isLoading}
                className={`w-1/5 py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
              >
                {isLoading ? "확인" : "확인"}
              </button>
            </div>
          )}

          {message && <p className="text-sm text-red-500 mt-2">{message}</p>}

          <button
            onClick={handleSignUp}
            disabled={isLoading}
            className={`w-full py-2 mt-4 rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"} text-white`}
          >
            {isLoading ? "가입 중..." : "가입하기"}
          </button>
        </div>
      </div>

      <GrayFooter />
    </div>
  );
}
