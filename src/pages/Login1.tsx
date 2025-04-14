import React from "react";
import { styles, ButtonType } from "../styles/Login1";

export default function Login() {
  const handleClick = (type: ButtonType) => {
    console.log(`${type} 로그인 시도`);
  };

  return (
    <div className={`${styles.container} relative`}>
      {/* 로고 */}
      <div className={styles.logoWrapper}>
        <img
          src="/logo.png"
          alt="Gridam Logo"
          className={styles.logoImage}
        />
      </div>

      {/* 로그인 버튼들 */}
      <div className={styles.buttonGroup}>
        <button
          onClick={() => handleClick("kakao")}
          className={styles.kakaoButton}
        >
          <div className={styles.iconButtonWrapper}>
            <span>💬</span>
            <span>카카오톡으로 계속하기</span>
          </div>
        </button>

        <button
          onClick={() => handleClick("google")}
          className={styles.googleButton}
        >
          <div className={styles.iconButtonWrapper}>
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className={styles.googleIcon}
            />
            <span>구글로 계속하기</span>
          </div>
        </button>

        <button
          onClick={() => handleClick("gridam")}
          className={styles.gridamButton}
        >
          그리담 아이디로 로그인
        </button>
      </div>

      {/* 부가 링크 */}
      <div className={styles.subText}>계정 기억이 안나요</div>
      <div className={styles.signupText}>
        <span className="font-semibold">Gridam</span> 가입하기
      </div>
    </div>
  );
}
