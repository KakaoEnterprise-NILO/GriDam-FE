import type React from "react";
import { ImageIcon, Expand, Sparkles, X } from "lucide-react";
import type { EmotionCardProps } from "./types";
export default function EmotionCardFront({
  front,
  hashtags,
  imageError,
  imageLoaded,
  onImageError,
  onImageLoad,
  onExpand,
  onClose,
}: {
  front: EmotionCardProps["front"];
  hashtags: string[];
  imageError: boolean;
  imageLoaded: boolean;
  onImageError: () => void;
  onImageLoad: () => void;
  onExpand: (event: React.MouseEvent) => void;
  onClose?: () => void;
}) {
  return (
    <div
      className="absolute w-full h-full rounded-2xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden"
      style={{ backfaceVisibility: "hidden" }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-tr-full"></div>
      <button type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose?.();
        }}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg z-10"
        aria-label="Close emotion card"
      >
        <X size={20} />
      </button>
      <div className="p-8 h-full flex flex-col">
        <div className="text-center mb-6">
          <div
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${front.color}, ${front.color}dd)`,
              boxShadow: `0 8px 32px ${front.color}40`,
            }}
          >
            <Sparkles size={18} />
            {front.emotion}
          </div>
        </div>
        <div className="flex-1 relative mb-4 max-h-[300px]">
          <div className="w-full h-full rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200 bg-gray-100 relative">
            {imageError || !front.image ? (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                <ImageIcon size={64} className="mb-4" />
                <p className="text-sm font-medium">
                  이미지를 불러올 수 없습니다
                </p>
              </div>
            ) : (
              <>
                <>
                  {!imageLoaded && (
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                      <div className="text-gray-400">
                        <ImageIcon size={48} />
                      </div>
                    </div>
                  )}
                </>
                <img
                  src={front.image || "/placeholder.svg"}
                  alt="emotion card"
                  className={`w-full h-full object-cover object-center transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ minHeight: "250px", maxHeight: "300px" }}
                  onError={onImageError}
                  onLoad={onImageLoad}
                />
                {imageLoaded && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                )}
              </>
            )}
            {imageLoaded && !imageError && front.image && (
              <button type="button"
                onClick={onExpand}
                className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200 shadow-lg group"
                title="이미지 확대"
                aria-label="Expand emotion card image"
              >
                <Expand
                  size={16}
                  className="group-hover:scale-110 transition-transform"
                />
              </button>
            )}
          </div>
        </div>
        <div className="text-center mb-4">
          <div className="flex flex-wrap justify-center gap-2">
            {hashtags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
              >
                #{tag.replace(/^#/, "")}
              </span>
            ))}
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></span>
            카드를 터치하여 분석 결과 보기
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></span>
          </p>
        </div>
      </div>
    </div>
  );
}
