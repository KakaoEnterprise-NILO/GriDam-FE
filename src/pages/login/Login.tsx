import Footer from "@/components/common/Footer";
import GridamLogo from "@/assets/picture/gridam.svg";
import KakaoLogo from "@/assets/picture/login/kakao_login_logo.svg";
import NaverLogo from "@/assets/picture/login/naver_login.logo.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "@/api/axios";


export default function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [isRemembered, setIsRemembered] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleRemember = () => {
    setIsRemembered(!isRemembered);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/auth/login", {
        loginId,
        password,
      });

      console.log("로그인 성공:", response.data);

      // 로그인 성공 시 로컬스토리지 저장 (예: 토큰 등)
      // localStorage.setItem("token", response.data.token);
      // navigate("/") 등 원하는 페이지로 이동
      navigate("/HomeMyDiary"); // 예시: 로그인 후 메인으로 이동
    } catch (error: any) {
      if (error.response) {
        setError(error.response.data.message || "로그인에 실패했습니다.");
      } else {
        setError("서버와 연결할 수 없습니다.");
      }
    }
  };

  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center p-1 bg-[#F0F3FA]">
      <div className="flex flex-col items-center justify-start flex-1 mt-0 transform scale-90">
        <div className="mb-2">
          <img src={GridamLogo} alt="그리담 로고" className="w-52 h-44" />
        </div>

        <div className="bg-white w-120 h-145 px-20 py-6 rounded-2xl shadow-lg mb-4">
          <h2 className="text-center text-[24px] font-bold mb-4">로그인</h2>

          <div className="flex justify-center space-x-5 mb-4">
            <button className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
              <img src={KakaoLogo} alt="카카오 로그인" className="w-full h-full object-cover" />
            </button>
            <button className="bg-green-500 w-16 h-16 rounded-full flex items-center justify-center overflow-hidden">
              <img src={NaverLogo} alt="네이버 로그인" className="w-full h-full object-cover" />
            </button>
          </div>

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

          {/* 에러 메시지 출력 */}
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full px-3 py-2 my-8 bg-[#333333] text-white rounded-lg hover:bg-[#444444] mt-3"
          >
            로그인
          </button>

          <div className="text-center mt-25 text-sm text-[15px] text-gray-500 flex justify-center space-x-4">
            <a href="#" className="hover:underline">
              비밀번호 찾기
            </a>
            <span>|</span>
            <button className="hover:underline text-gray-500" onClick={handleRegisterClick}>
              회원가입
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
