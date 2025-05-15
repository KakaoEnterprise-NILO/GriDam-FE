import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';

export default function TopBar() {
  return (
    <div className="ml-5 flex justify-between items-center mb-6">
      {/* 검색창 */}
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="share your feeling"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>

      {/* 프로필 + 로그인 */}
      <div className="flex items-center space-x-4">
        {/* 프로필 이미지 */}
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-300">
          <img
            src="/logo.png"
            alt="프로필"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 로그인 버튼 */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition">
          로그인
        </button>
      </div>
    </div>
  );
}
