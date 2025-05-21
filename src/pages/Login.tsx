import React from "react";
import Footer from "../components/common/Footer";
import GridamLogo from "@/assets/picture/login/gridam.svg";

export default function Login() {
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between bg-[#F0F3FA]">
      {/* 로그인 컨테이너 */}
      <div className="flex flex-col items-center justify-center flex-1">
        {/* 로고 */}
        <div className="mb-8">
          <img src={GridamLogo} alt="그리담 로고" className="w-60 h-50" />
        </div>

        {/* 로그인 카드 */}
        <div className="bg-white w-110 p-8 rounded-2xl shadow-lg">
          <h2 className="text-center text-lg font-bold mb-6">로그인</h2>

          {/* 소셜 로그인 */}
          <div className="flex justify-center space-x-7 mb-4">
            <button className="bg-yellow-400 w-20 h-20 rounded-full flex items-center justify-center">
              🐦
            </button>
            <button className="bg-green-500 w-20 h-20 rounded-full flex items-center justify-center">
              🅽
            </button>
          </div>

          <p className="text-center text-gray-500 mb-4">or</p>

          {/* 아이디/이메일 입력 */}
          <input
            type="text"
            placeholder="아이디 혹은 이메일"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 비밀번호 입력 */}
          <input
            type="password"
            placeholder="비밀번호"
            className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />

          {/* 로그인 유지 체크박스 */}
          <div className="flex items-center mb-4">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-sm text-gray-600">
              로그인 상태 유지
            </label>
          </div>

          {/* 로그인 버튼 */}
          <button className="w-full bg-[#333333] text-white py-3 rounded-lg hover:bg-[#444444]">
            로그인
          </button>

          {/* 비밀번호/아이디 찾기 */}
          <div className="text-center mt-4 text-sm text-gray-500">
            <a href="#" className="hover:underline">
              비밀번호 찾기
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              아이디 찾기
            </a>{" "}
            |{" "}
            <a href="#" className="hover:underline">
              회원가입
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
