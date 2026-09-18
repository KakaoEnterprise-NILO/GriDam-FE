"use client";

import { createPortal } from "react-dom";
import FullscreenImageViewer from "./FullscreenImageViewer";
import EmotionCardFront from "./emotion-card/EmotionCardFront";
import EmotionCardBack from "./emotion-card/EmotionCardBack";
import { useEmotionCard } from "./emotion-card/useEmotionCard";
import type { EmotionCardProps } from "./emotion-card/types";

export default function EmotionCard({
  front,
  back,
  onClose,
}: EmotionCardProps) {
  const card = useEmotionCard(back.emotions, back.chartData);
  const modalContent = (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div
          className="w-[380px] h-[620px] relative cursor-pointer"
          onClick={() => card.setFlipped(!card.flipped)}
          style={{ perspective: "1500px" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: card.flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            <EmotionCardFront
              front={front}
              hashtags={back.hashtags}
              imageError={card.imageError}
              imageLoaded={card.imageLoaded}
              onImageError={card.handleImageError}
              onImageLoad={card.handleImageLoad}
              onExpand={card.handleExpandImage}
              onClose={onClose}
            />
            <EmotionCardBack
              front={front}
              back={back}
              chartData={card.chartDataWithColors}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
      {card.showFullscreenImage && (
        <FullscreenImageViewer
          front={front}
          imageError={card.imageError}
          onImageError={card.handleImageError}
          onClose={() => card.setShowFullscreenImage(false)}
        />
      )}
    </>
  );
  return createPortal(modalContent, document.body);
}
