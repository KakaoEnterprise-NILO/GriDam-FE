"use client";

import DiaryCardMenu from "./diary-card/DiaryCardMenu";
import DiaryCardContent from "./diary-card/DiaryCardContent";
import DiaryCardFooter from "./diary-card/DiaryCardFooter";
import DiaryEmotionCardModal from "./diary-card/DiaryEmotionCardModal";
import { useDiaryCard } from "./diary-card/useDiaryCard";
import type { DiaryCardProps } from "./diary-card/types";

export default function DiaryCard({
  id,
  title,
  content,
  date,
  imageUrl,
  hashtags,
  onDelete,
}: DiaryCardProps) {
  const card = useDiaryCard(id, date, onDelete);
  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden relative">
        <DiaryCardMenu
          menuRef={card.menuRef}
          showMenu={card.showMenu}
          onToggle={() => card.setShowMenu(!card.showMenu)}
          onDelete={card.handleDelete}
        />
        <DiaryCardContent
          title={title}
          content={content}
          date={date}
          imageUrl={imageUrl}
          emotion={card.emotion}
          color={card.color}
          hasEmotionCard={card.emotionCardExists}
          expanded={card.isExpanded}
          imageError={card.imageError}
          imageLoaded={card.imageLoaded}
          onToggleExpand={() => card.setIsExpanded(!card.isExpanded)}
          onImageError={() => {
            if (!card.imageError) card.setImageError(true);
          }}
          onImageLoad={() => card.setImageLoaded(true)}
        />
        <DiaryCardFooter
          hashtags={hashtags}
          color={card.color}
          buttonText={card.buttonText}
          disabled={card.isEmotionButtonDisabled}
          onFetch={card.fetchEmotionCard}
        />
      </div>
      {card.showModal && card.emotionCardData && (
        <DiaryEmotionCardModal
          data={card.emotionCardData}
          date={date}
          onClose={() => card.setShowModal(false)}
        />
      )}
    </>
  );
}
