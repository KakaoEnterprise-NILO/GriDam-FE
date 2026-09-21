import refreshIcon from "@/assets/icons/refresh_button_icon.svg"
import defaultImg from "@/assets/picture/default_img.jpg"
import DownloadEmotionCard from "../DownloadEmotionCard"

interface EmotionCardActionsProps {
  imageUrl: string | null
  diaryId: string
  loading: boolean
  onRegenerate: () => void
  onRefresh: () => void
}

export function EmotionCardActions({
  imageUrl,
  diaryId,
  loading,
  onRegenerate,
  onRefresh
}: EmotionCardActionsProps) {
  return (
    <div className="absolute top-4 right-4 flex flex-col space-y-2">
      <button
        className="icon-button"
        onClick={onRegenerate}
        disabled={loading}
        title="카드 재생성"
      >
        <img
          src={refreshIcon || "/placeholder.svg"}
          alt="재생성"
          className={`w-6 h-6 ${loading ? "animate-spin opacity-50" : ""}`}
        />
      </button>

      <button
        className="icon-button bg-blue-500 text-white rounded p-1"
        onClick={onRefresh}
        disabled={loading}
        title="이미지 새로고침"
      >
        🔄
      </button>

      {imageUrl && imageUrl !== defaultImg && (
        <DownloadEmotionCard
          imageUrl={imageUrl}
          fileName={`emotion_card_${diaryId}.png`}
        />
      )}
    </div>
  )
}

export function EmotionCardCompleteButton({
  loading,
  onPreview
}: {
  loading: boolean
  onPreview: () => void
}) {
  return (
    <div className="flex justify-center mt-4">
      <button
        className="bg-blue-500 text-white py-2 px-12 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={onPreview}
        disabled={loading}
      >
        {loading ? "처리 중..." : "완료"}
      </button>
    </div>
  )
}
