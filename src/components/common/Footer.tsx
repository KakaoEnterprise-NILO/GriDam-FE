import React from "react";

export default function Footer() {
  return (
    <footer className="w-screen h-36 bg-blue-400 text-white fixed bottom-0 left-0 flex items-center justify-center">
      <div className="max-w-screen-xl w-full flex flex-col items-center justify-center space-y-2">
        {/* 상단 링크 */}
        <div className="flex space-x-6 text-sm">
          <a href="#" className="hover:underline">
            NILO
          </a>
          <a href="#" className="hover:underline">
            소개
          </a>
          <a href="#" className="hover:underline">
            이용약관
          </a>
          <a href="#" className="hover:underline">
            개인 정보 처리 방침
          </a>
        </div>

        {/* 하단 저작권 */}
        <div className="text-xs">© 2025 Gridam from NILO Corp.</div>
      </div>
    </footer>
  );
}
