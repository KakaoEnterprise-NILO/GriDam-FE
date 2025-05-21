import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-[#F7F8FC]">
      {/* 메인 영역: Sidebar + TopBar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 p-4 ml-8 flex-shrink-0">
          <Navbar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col p-6 ">
          {/* Top Bar: Search + Profile */}
          <div className="ml-5 flex justify-between items-center mb-6">
            {/* Search Input */}
            <div className="relative w-1/2">
              <input
                type="text"
                placeholder="share your feeling"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            </div>

            {/* Profile + Login */}
            <div className="flex items-center space-x-4">
              <div className="w-13 h-13 rounded-full overflow-hidden border border-gray-300">
                <img
                  src="/logo.png"
                  alt="프로필"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
                로그인
              </button>
            </div>
          </div>

          {/* Content */}
          <main className="ml-5 bg-white rounded-2xl shadow p-10">
            {children}
          </main>
        </div>
      </div>

      {/* Footer 항상 하단 고정 */}
      <Footer />
    </div>
  );
}
