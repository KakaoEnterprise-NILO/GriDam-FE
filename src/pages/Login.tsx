import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/common/Footer";
import GridamLogo from "../../assets/picture/gridam.svg";
import KakaoLogo from "../../assets/picture/kakao_login_logo.svg";
import NaverLogo from "../../assets/picture/naver_login.logo.svg";

export default function Login() {
  const [isRemembered, setIsRemembered] = useState(false);
  const navigate = useNavigate();

  const toggleRemember = () => {
    setIsRemembered(!isRemembered);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center p-1 bg-[#F0F3FA]">
      {/* 로그인 컨테이너 */}
      <div className="flex flex-col items-center justify-start flex-1 mt-0 transform scale-90">
        {/* 로고 */}
        <div className="mb-2">
          <img src={GridamLogo} alt="그리담 로고" className="w-52 h-44" />
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white w-120 h-145 px-20 py-6 rounded-2xl shadow-lg mb-4">
          <h2 className="text-center text-[24px] font-bold mb-4">로그인</h2>

          {/* 소셜 로그인 */}
          <div className="flex justify-center space-x-5 mb-4">
            <button className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
              <img src={KakaoLogo} alt="카카오 로그인" className="w-full h-full object-cover" />
            </button>
            <button className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
              <img src={NaverLogo} alt="네이버 로그인" className="w-full h-full object-cover" />
            </button>
          </div>

          <p className="text-center text-gray-500 mb-4">or</p>

          {/* 아이디/이메일 입력 */}
          <input
            type="text"
            placeholder="아이디 혹은 이메일"
            className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 로그인 유지 토글 스위치 */}
          <div className="flex items-center mb-3 px-3 cursor-pointer" onClick={toggleRemember}>
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

          {/* 로그인 버튼 */}
          <button className="w-full px-3 py-2 my-8 bg-[#333333] text-white rounded-lg hover:bg-[#444444] mt-3">
            로그인
          </button>

          {/* 비밀번호/아이디 찾기 및 회원가입 */}
          <div className="text-center mt-25 text-sm text-[15px] text-gray-500 flex justify-center space-x-4">
            <a href="#" className="hover:underline">
              비밀번호 찾기
            </a>
            <span>|</span>
            <button
              className="hover:underline text-gray-500"
              onClick={handleRegisterClick}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
