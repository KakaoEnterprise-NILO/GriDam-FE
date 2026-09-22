import type { DiaryPopupBodyProps } from "./types"

export default function DiaryPopupBody({ diary, loading, error, onRetry, onClose }: DiaryPopupBodyProps) {
  return (
    loading ? (
      <div className="h-full flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
        <p className="text-gray-500 font-medium">일기를 불러오는 중...</p>
      </div>
    ) : error ? (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="mb-6">
          <div className="text-red-400 text-5xl mb-4">⚠️</div>
          <h3 className="text-red-600 font-semibold mb-3 text-lg">오류가 발생했습니다</h3>
          <p className="text-gray-600 leading-relaxed">{error}</p>
        </div>
        <div className="space-y-3 w-full max-w-xs">
          <button type="button"
            onClick={onRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full"
          >
            다시 시도
          </button>
          <button type="button"
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors w-full"
          >
            닫기
          </button>
        </div>
      </div>
    ) : !diary ? (
      <div className="h-full flex flex-col items-center justify-center text-center p-6">
        <div className="text-gray-300 text-6xl mb-6">📝</div>
        <h3 className="text-gray-600 font-semibold text-lg mb-2">일기가 없습니다</h3>
        <p className="text-gray-500">해당 날짜에 작성된 일기가 없습니다.</p>
      </div>
    ) : (
      <div className="h-full overflow-y-auto p-6 space-y-6">
        {diary.imageUrl && (
          <div className="w-full h-56 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={diary.imageUrl || "/placeholder.svg"}
              alt="Diary"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=224&width=400"
              }}
            />
          </div>
        )}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
          <p className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">{diary.content}</p>
        </div>
      </div>

    )
  )
}
