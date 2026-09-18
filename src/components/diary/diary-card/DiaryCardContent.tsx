import { Clock, ImageIcon } from "lucide-react";
export default function DiaryCardContent({
  title,
  content,
  date,
  imageUrl,
  emotion,
  color,
  hasEmotionCard,
  expanded,
  imageError,
  imageLoaded,
  onToggleExpand,
  onImageError,
  onImageLoad,
}: {
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  emotion: string;
  color: string;
  hasEmotionCard: boolean | null;
  expanded: boolean;
  imageError: boolean;
  imageLoaded: boolean;
  onToggleExpand: () => void;
  onImageError: () => void;
  onImageLoad: () => void;
}) {
  return (
    <div
      className="flex justify-between p-4 pt-8 cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onToggleExpand}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold">{title}</h2>
          <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">
            · {date}
          </p>
          {emotion && hasEmotionCard === true && (
            <span
              className="text-xs px-2 py-1 rounded-full text-white font-semibold"
              style={{ backgroundColor: color }}
            >
              {emotion}
            </span>
          )}
          {hasEmotionCard === false && (
            <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600 font-semibold flex items-center gap-1">
              <Clock size={10} />
              분석 중
            </span>
          )}
        </div>
        <p
          className={`text-sm text-gray-400 mt-1 w-[70%] whitespace-pre-line transition-all duration-300 ${expanded ? "" : "line-clamp-2"}`}
        >
          {content}
        </p>
      </div>
      <div className="flex-shrink-0 ml-auto mr-[5%]">
        {imageUrl ? (
          imageError ? (
            <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md">
              <ImageIcon className="text-gray-400" size={32} />
            </div>
          ) : (
            <>
              <>
                {!imageLoaded && (
                  <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-md flex items-center justify-center">
                    <div className="text-gray-400">
                      <ImageIcon size={24} />
                    </div>
                  </div>
                )}
              </>
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="diary"
                className={`w-24 h-24 object-cover rounded-md transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                onError={onImageError}
                onLoad={onImageLoad}
              />
            </>
          )
        ) : null}
      </div>
    </div>
  );
}
