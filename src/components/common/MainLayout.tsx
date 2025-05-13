
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

          {/* 내용 작성 */}
          <textarea
            className="w-full h-48 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 resize-none"
            placeholder="오늘은 무슨 일이 있었나요?"
          />

          {/* 이미지 추가 */}
          <div className="flex items-center space-x-3">
            <button className="bg-gray-200 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-300">
              이미지 추가
            </button>
          </div>

          {/* 작성 완료 버튼 */}
          <div className="flex justify-end mt-4">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
