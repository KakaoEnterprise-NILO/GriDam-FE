import { useEffect } from "react";
import { X, ImageIcon, Sparkles } from "lucide-react";

interface FullscreenImageViewerProps {
  front: {
    image: string;
    color: string;
    emotion: string;
  };
  imageError: boolean;
  onImageError: () => void;
  onClose: () => void;
}

export default function FullscreenImageViewer({
  front,
  imageError,
  onImageError,
  onClose,
}: FullscreenImageViewerProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 shadow-lg z-10"
      >
        <X size={24} />
      </button>

      {/* 이미지 컨테이너 - 감정 라벨을 위한 공간 확보 */}
      <div className="flex-1 flex items-center justify-center w-full max-h-[calc(100vh-120px)]">
        {imageError || !front.image ? (
          <div className="flex flex-col items-center justify-center text-white">
            <ImageIcon size={80} className="mb-4 opacity-50" />
            <p className="text-lg">이미지를 불러올 수 없습니다</p>
          </div>
        ) : (
          <img
            src={front.image || "/placeholder.svg"}
            alt="emotion card full size"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onError={onImageError}
          />
        )}
      </div>

      <div className="flex-shrink-0 py-6">
        <div
          className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-xl shadow-2xl backdrop-blur-sm border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${front.color}, ${front.color}dd)`,
            boxShadow: `0 12px 40px ${front.color}60`,
          }}
        >
          <Sparkles size={22} />
          {front.emotion}
        </div>
      </div>

      <div className="flex-shrink-0 pb-4">
        <p className="text-white/70 text-sm text-center">
          화면을 터치하거나 ESC 키를 눌러 닫기
        </p>
      </div>
    </div>
  );
}
