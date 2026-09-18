import KakaoLogo from "@/assets/picture/login/kakao_login_logo.svg";
import NaverLogo from "@/assets/picture/login/naver_login.logo.svg";
export default function SocialLoginButtons({
  onSocialClick,
}: {
  onSocialClick: (provider: "kakao" | "naver") => void;
}) {
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
