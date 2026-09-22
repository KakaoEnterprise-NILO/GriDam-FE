import PhoneVerification from "@/components/auth/PhoneVerification";
import type { RegisterFormData } from "./useRegisterPage";
interface Props {
  formData: RegisterFormData;
  errorMsg: string;
  isLoading: boolean;
  isAuthSent: boolean;
  message: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sendCode: (phoneNum: string) => void;
  verifyCode: (phoneNum: string, code: string) => void;
  onSubmit: () => void;
}
export default function RegisterForm({
  formData,
  errorMsg,
  isLoading,
  isAuthSent,
  message,
  onChange,
  sendCode,
  verifyCode,
  onSubmit,
}: Props) {
  return (
    <div className="space-y-3">
      <label htmlFor="register-login-id" className="sr-only">아이디</label>
      <input id="register-login-id"
        type="text"
        name="loginId"
        placeholder="아이디"
        value={formData.loginId}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <label htmlFor="register-password" className="sr-only">비밀번호</label>
      <input id="register-password"
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <label htmlFor="register-check-password" className="sr-only">비밀번호 확인</label>
      <input id="register-check-password"
        type="password"
        name="checkPassword"
        placeholder="비밀번호 확인"
        value={formData.checkPassword}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <label htmlFor="register-nickname" className="sr-only">이름</label>
      <input id="register-nickname"
        type="text"
        name="nickname"
        placeholder="이름"
        value={formData.nickname}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      />
      <PhoneVerification
        phoneNum={formData.phoneNum}
        authCode={formData.authCode}
        onPhoneNumChange={onChange}
        onAuthCodeChange={onChange}
        isLoading={isLoading}
        isAuthSent={isAuthSent}
        message={message}
        sendCode={sendCode}
        verifyCode={verifyCode}
      />
      {errorMsg && (
        <p className="text-red-600 text-sm mt-2 font-semibold">{errorMsg}</p>
      )}
      <button type="button"
        onClick={onSubmit}
        disabled={isLoading}
        className={`w-full py-2 mt-4 rounded-lg text-white ${isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}`}
      >
        {isLoading ? "가입 중..." : "가입하기"}
      </button>
    </div>
  );
}
