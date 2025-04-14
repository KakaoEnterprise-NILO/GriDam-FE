import React from "react";
import { styles } from "../styles/Login2";

export default function Login2() {
  return (
    <div className={styles.container}>
      {/* 로고 */}
      <div className={styles.logoWrapper}>
        <img
          src="/logo.png"
          alt="Gridam Logo"
          className={styles.logoImage}
        />
        
      </div>

      {/* 입력 필드 */}
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="아이디를 입력하세요"
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요"
          className={styles.inputField}
        />
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="auto-login" />
          <label htmlFor="auto-login" className="text-sm text-gray-500">
            자동 로그인
          </label>
        </div>
      </div>

      {/* 로그인 버튼 */}
      <button className={styles.loginButton}>로그인</button>

      {/* 하단 링크 */}
      <div className={styles.footer}>
        <span className={styles.footerLink}>아이디 찾기</span>
        <span>|</span>
        <span className={styles.footerLink}>비밀번호 찾기</span>
        <span>|</span>
        <span className={styles.footerLink}>회원가입</span>
      </div>
    </div>
  );
}
