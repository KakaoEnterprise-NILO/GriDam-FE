import SocialLoginButtons from "./SocialLoginButtons";
import RememberMeCheckbox from "./RememberMeCheckbox";
interface Props {
  loginId: string;
  password: string;
  isRemembered: boolean;
  errorMsg: string;
  onLogin: () => void;
  onRegister: () => void;
  onSocialLogin: (provider: "kakao" | "naver") => void;
  onLoginIdChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberToggle: () => void;
}
export default function LoginForm({
  loginId,
  password,
  isRemembered,
  errorMsg,
  onLogin,
  onRegister,
  onSocialLogin,
  onLoginIdChange,
  onPasswordChange,
  onRememberToggle,
}: Props) {
  return (
    <section className="bg-white w-full max-w-[480px] min-h-[580px] px-5 sm:px-10 md:px-20 py-6 rounded-2xl shadow-lg mb-4">
      <h2 className="text-center text-2xl font-bold mb-4">로그인</h2>
      <SocialLoginButtons onSocialClick={onSocialLogin} />
      <p className="text-center text-gray-500 mb-4">or</p>
      <label htmlFor="login-id" className="sr-only">아이디 또는 이메일</label>
      <input id="login-id"
        type="text"
        placeholder="아이디 혹은 이메일"
        value={loginId}
        onChange={(e) => onLoginIdChange(e.target.value)}
        className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <label htmlFor="login-password" className="sr-only">비밀번호</label>
      <input id="login-password"
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        className="w-full px-3 mb-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <RememberMeCheckbox
        isRemembered={isRemembered}
        onToggle={onRememberToggle}
      />
      {errorMsg && (
        <p className="text-red-500 text-sm mb-2 font-semibold">{errorMsg}</p>
      )}
      <button type="button"
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
          onClick={onRegister}
          type="button"
        >
          회원가입
        </button>
      </div>
    </section>
  );
}
