interface EmotionCardImageProps {
  imageUrl: string | null
  loading: boolean
  error: string | null
  onImageError: () => void
  onRefresh: () => void
}

export default function EmotionCardImage({
  imageUrl,
  loading,
  error,
  onImageError,
  onRefresh
}: EmotionCardImageProps) {
  return (
    <>
      <div className="flex justify-center">
        <div className="rounded-lg overflow-hidden shadow">
          {loading ? (
            <div className="w-64 h-64 bg-gray-300 animate-pulse flex flex-col items-center justify-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
              <div>감정 카드 생성 중...</div>
              <div className="text-xs mt-1"></div>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="감정 카드"
              className="block max-w-full h-auto rounded-lg shadow"
              onError={onImageError}
            />
          ) : (
            <div className="w-64 h-64 bg-red-100 flex flex-col items-center justify-center text-sm text-red-500">
              <div>이미지 없음</div>
              <button type="button"
                onClick={onRefresh}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
              >
                다시 시도
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
          {error}
        </div>
      )}
    </>
  )
}
