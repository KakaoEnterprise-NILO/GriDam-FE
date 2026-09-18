"use client"

import { useDayDiaryPopup } from "./day-diary-popup/useDayDiaryPopup"
import { DiaryPopupHeader, DiaryPopupTabs } from "./day-diary-popup/DiaryPopupChrome"
import DiaryPopupBody from "./day-diary-popup/DiaryPopupBody"
import DiaryEmotionCard from "./day-diary-popup/DiaryEmotionCard"
import type { DiaryPopupProps } from "./day-diary-popup/types"

export default function DiaryPopup({ open, onClose, date, diaryId }: DiaryPopupProps) {
  const { showCard, setShowCard, diary, loading, error, emotionCard, emotionLoading, retryDiary } =
    useDayDiaryPopup({ open, date, diaryId })

  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-lg h-[650px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        <DiaryPopupHeader date={date} title={showCard ? "감정 카드" : diary?.title || "일기"} onClose={onClose} />
        <div className="flex-1 overflow-hidden">
          {!loading && !error && diary && showCard ? (
            <DiaryEmotionCard diary={diary} date={date} emotionCard={emotionCard} emotionLoading={emotionLoading} />
          ) : (
            <DiaryPopupBody diary={diary} loading={loading} error={error} onRetry={retryDiary} onClose={onClose} />
          )}
        </div>
        {diary && !loading && !error && <DiaryPopupTabs showCard={showCard} onSelect={setShowCard} />}
      </div>
    </div>
  )
}
