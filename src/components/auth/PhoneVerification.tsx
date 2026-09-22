import React from "react";

interface PhoneVerificationProps {
  phoneNum: string;
  authCode: string;
  isLoading: boolean;
  isAuthSent: boolean;
  message: string;
  onPhoneNumChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAuthCodeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sendCode: (phoneNum: string) => void;
  verifyCode: (phoneNum: string, code: string) => void;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  phoneNum,
  authCode,
  isLoading,
  isAuthSent,
  message,
  onPhoneNumChange,
  onAuthCodeChange,
  sendCode,
  verifyCode,
}) => {
  return (
    <div>
      <div className="flex space-x-2 mb-3">
        <label htmlFor="register-phone" className="sr-only">전화번호</label>
        <input id="register-phone"
          type="text"
          placeholder="전화번호"
          value={phoneNum}
          onChange={onPhoneNumChange}
          className="w-4/5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          name="phoneNum"
        />
        <button type="button"
          onClick={() => sendCode(phoneNum)}
          disabled={isLoading || isAuthSent}
          className={`w-1/5 py-2 rounded-lg text-white ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          인증
        </button>
      </div>

      {isAuthSent && (
        <div className="flex space-x-2 mb-3">
          <label htmlFor="register-auth-code" className="sr-only">인증번호</label>
          <input id="register-auth-code"
            type="text"
            placeholder="인증번호"
            value={authCode}
            onChange={onAuthCodeChange}
            className="w-4/5 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            name="authCode"
          />
          <button type="button"
            onClick={() => verifyCode(phoneNum, authCode)}
            disabled={isLoading}
            className={`w-1/5 py-2 rounded-lg text-white ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            확인
          </button>
        </div>
      )}

      {message && <p className="text-sm text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default PhoneVerification;
