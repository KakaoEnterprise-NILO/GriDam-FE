import { createPortal } from "react-dom";
import FullscreenImageViewer from "./FullscreenImageViewer";
import EmotionCardFront from "./emotion-card/EmotionCardFront";
import EmotionCardBack from "./emotion-card/EmotionCardBack";
import { useEmotionCard } from "./emotion-card/useEmotionCard";
import type { EmotionCardProps } from "./emotion-card/types";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export default function EmotionCard({
  front,
  back,
  onClose,
}: EmotionCardProps) {
  const card = useEmotionCard(back.emotions, back.chartData);
  const modalContent = (
    <Dialog open onOpenChange={(open) => !open && onClose?.()}>
      <DialogContent showClose={false} className="z-50 w-auto max-w-none border-0 bg-transparent p-0 shadow-none">
        <DialogTitle className="sr-only">{front.emotion} emotion card</DialogTitle>
        <DialogDescription className="sr-only">View the emotion card and its analysis.</DialogDescription>
        <div
          className="w-full max-w-[380px] aspect-[380/620] max-h-[620px] relative cursor-pointer"
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
        {card.showFullscreenImage && (
          <FullscreenImageViewer
            front={front}
            imageError={card.imageError}
            onImageError={card.handleImageError}
            onClose={() => card.setShowFullscreenImage(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
  return createPortal(modalContent, document.body);
}
