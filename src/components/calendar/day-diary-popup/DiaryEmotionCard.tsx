import EmotionCard from "../EmotionCardCalendar"
import { getEmotionCardProps } from "./utils"
import type { DiaryEmotionCardProps } from "./types"

export default function DiaryEmotionCard({ diary, date, emotionCard, emotionLoading }: DiaryEmotionCardProps) {
  return (
    <div className="h-full flex items-center justify-center p-6">
      {emotionLoading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-500 font-medium">감정 카드를 불러오는 중...</p>
        </div>
      ) : emotionCard ? (
        <EmotionCard {...getEmotionCardProps(emotionCard, diary, date)} />
      ) : (
        <div className="text-center">
          <div className="text-gray-300 text-6xl mb-6">🎭</div>
          <h3 className="text-gray-600 font-semibold text-lg mb-2">카드를 불러올 수 없습니다</h3>
          <p className="text-gray-500">감정 카드를 불러올 수 없습니다.</p>
        </div>
      )}
    </div>
  )
}
