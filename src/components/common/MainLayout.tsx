import { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import Topbar from './Topbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-[#F7F8FC]">
      <div className="flex flex-1">
        <aside className="w-64 p-4 ml-8 flex-shrink-0">
          <Navbar />
        </aside>

        <div className="flex-1 flex flex-col p-6">
          {/* 상단바(검색 + 프로필) */}
          <Topbar />

          {/* Content */}
          <main className="ml-5 bg-white rounded-2xl shadow p-10">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
