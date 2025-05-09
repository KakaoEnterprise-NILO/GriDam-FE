import React from "react";

export default function GrayFooter() {
  return (
    <footer className="w-full bg-[#F8F8F8] text-[#333333] py-6 mt-10">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center space-y-2">
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
