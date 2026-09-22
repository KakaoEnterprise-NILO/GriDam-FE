import "./UploadEmotionCard.css"
import {
  EmotionCardActions,
  EmotionCardCompleteButton
} from "./upload-emotion-card/EmotionCardActions"
import EmotionCardImage from "./upload-emotion-card/EmotionCardImage"
import EmotionCardSharing from "./upload-emotion-card/EmotionCardSharing"
import { useUploadEmotionCard } from "./upload-emotion-card/useUploadEmotionCard"
import type { UploadEmotionCardProps } from "./upload-emotion-card/types"

export default function UploadEmotionCard({
  onPreview,
  diaryId,
  diaryInfo
}: UploadEmotionCardProps) {
  const card = useUploadEmotionCard(diaryId, diaryInfo)

  return (
    <div className="flex w-full min-w-0 justify-center items-start p-0">
      <div className="bg-white w-full max-w-[600px] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg flex flex-col space-y-4 transition-all duration-500 relative">
        <EmotionCardActions
          imageUrl={card.imageUrl}
          diaryId={diaryId}
          loading={card.loading}
          onRegenerate={card.handleRegenerate}
          onRefresh={card.handleManualRefresh}
        />
        <EmotionCardImage
          imageUrl={card.imageUrl}
          loading={card.loading}
          error={card.error}
          onImageError={card.handleImageError}
          onRefresh={card.handleManualRefresh}
        />
        <hr className="border-t border-gray-300 my-4" />
        <EmotionCardSharing
          feedVisibility={card.feedVisibility}
          shareScope={card.shareScope}
          summary={card.summary}
          progress={card.progress}
          progressBarRef={card.progressBarRef}
          onFeedVisibilityChange={card.setFeedVisibility}
          onShareScopeChange={card.setShareScope}
          updateProgress={card.updateProgress}
        />
        <EmotionCardCompleteButton
          loading={card.loading}
          onPreview={onPreview}
        />
      </div>
    </div>
  )
}
