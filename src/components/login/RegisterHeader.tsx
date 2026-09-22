import GridamLogo from "@/assets/picture/gridam.svg";
import KakaoLogo from "@/assets/picture/login/kakao_login_logo.svg";
import NaverLogo from "@/assets/picture/login/naver_login.logo.svg";
export default function RegisterHeader() {
  return (
    <div className="flex flex-col items-center mb-4">
      <img src={GridamLogo} alt="Gridam Logo" className="w-30 h-24 mb-2" />
      <h2 className="text-lg font-bold mb-2">회원가입</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <button type="button" className="bg-yellow-400 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={KakaoLogo}
            alt="카카오 로그인"
            className="w-full h-full object-cover"
          />
        </button>
        <button type="button" className="bg-green-500 w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
          <img
            src={NaverLogo}
            alt="네이버 로그인"
            className="w-full h-full object-cover"
          />
        </button>
      </div>
      <p className="text-center text-gray-500 mb-4">또는</p>
    </div>
  );
}
