import { useDayDiaryPopup } from "./day-diary-popup/useDayDiaryPopup"
import { DiaryPopupHeader, DiaryPopupTabs } from "./day-diary-popup/DiaryPopupChrome"
import DiaryPopupBody from "./day-diary-popup/DiaryPopupBody"
import DiaryEmotionCard from "./day-diary-popup/DiaryEmotionCard"
import type { DiaryPopupProps } from "./day-diary-popup/types"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

export default function DiaryPopup({ open, onClose, date, diaryId }: DiaryPopupProps) {
  const { showCard, setShowCard, diary, loading, error, emotionCard, emotionLoading, retryDiary } =
    useDayDiaryPopup({ open, date, diaryId })


  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent showClose={false} className="relative w-full max-w-lg h-[650px] p-0 gap-0 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        <DialogTitle className="sr-only">{showCard ? "Emotion card" : diary?.title || "Diary"}</DialogTitle>
        <DialogDescription className="sr-only">Review the diary and emotion card for the selected date.</DialogDescription>
        <DiaryPopupHeader date={date} title={showCard ? "감정 카드" : diary?.title || "일기"} onClose={onClose} />
        <div className="flex-1 overflow-hidden">
          {!loading && !error && diary && showCard ? (
            <DiaryEmotionCard diary={diary} date={date} emotionCard={emotionCard} emotionLoading={emotionLoading} />
          ) : (
            <DiaryPopupBody diary={diary} loading={loading} error={error} onRetry={retryDiary} onClose={onClose} />
          )}
        </div>
        {diary && !loading && !error && <DiaryPopupTabs showCard={showCard} onSelect={setShowCard} />}
      </DialogContent>
    </Dialog>
  )
}
