
export default function WritingDiary() {
  return (
    <>
      {/* 일기 작성 카드 */}
      <div className="flex justify-center items-start mt-6">
        <div className="bg-white w-3/5 p-6 rounded-2xl shadow-lg space-y-4">
          {/* 제목 */}
          <h2 className="text-lg font-bold">제목</h2>

          {/* 작성일자 */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-500">작성일자</span>
            <span className="text-gray-500">2025-05-01</span>
          </div>

          {/* Profile + Login */}
          <div className="flex items-center space-x-4">
            {/* 프로필 이미지 */}
            <div className="w-13 h-13 rounded-full overflow-hidden border border-gray-300">
              <img
                src="/logo.png"
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            {/* 로그인 버튼 */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
              로그인
            </button>
          </div>
        </div>

        {/* Content Area */}
        <main className="ml-5 bg-white rounded-2xl shadow p-10">
          {children}
        </main>
      </div>
    </div>
  )
}