import React from "react";
import GrayFooter from "../components/common/GrayFooter";
import GridamLogo from "../assets/picture/gridam.svg";
import KakaoLogo from "../assets/picture/kakao_login_logo.svg";
import NaverLogo from "../assets/picture/naver_login.logo.svg";

export default function SignUp() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center bg-[#F0F3FA]">
      {/* 상단 배경 */}
      <div className="w-full h-56 bg-[#A8BFFF] rounded-b-2xl"></div>

      {/* 회원가입 카드 */}
      <div className="bg-white w-96 p-6 rounded-2xl shadow-lg -mt-28 z-10">
        {/* 로고 */}
        <div className="flex flex-col items-center mb-4">
          <img src={GridamLogo} alt="Gridam Logo" className="w-30 h-24 mb-2" />
          <h2 className="text-lg font-bold mb-2">감정이 담긴 카드를 만들려면</h2>

          {/* 회원가입 + 하세요 텍스트 */}
          <div className="flex justify-center items-center space-x-1 mb-4">
            <span className="text-blue-600 font-bold">회원가입</span>
            <span className="text-lg font-bold">하세요</span>
          </div>
        </div>

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

        {/* 회원가입 폼 */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="아이디"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 전화번호 입력 및 인증 버튼 */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="전화번호"
              className="w-4/5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              인증
            </button>
          </div>

          {/* 인증번호 입력 및 확인 버튼 */}
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="인증번호"
              className="w-4/5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button className="w-1/5 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              확인
            </button>
          </div>

          <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 mt-4">
            가입하기
          </button>
        </div>
      </div>

      {/* Footer */}
      <GrayFooter />
    </div>
  );
}
