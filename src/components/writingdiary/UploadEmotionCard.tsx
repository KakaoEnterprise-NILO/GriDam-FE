import { useEffect, useState, useRef } from "react";
import "./UploadEmotionCard.css";
import refreshIcon from "../../assets/icons/refresh_button_icon.svg";
import defaultImg from "../../assets/picture/default_img.jpg";
import DownloadEmotionCard from "@/components/writingdiary/DownloadEmotionCard";
import { regenerateDiaryCard } from "@/services/regenerateDiaryCard";
import { getEmotionCardImage } from "@/services/emotionCardService";

interface UploadEmotionCardProps {
  onPreview: () => void;
  diaryId: string;
  diaryInfo: {
    title: string;
    content: string;
    imageFile?: File | null;
  };
}

export default function UploadEmotionCard({
  onPreview,
  diaryId,
  diaryInfo,
}: UploadEmotionCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedVisibility, setFeedVisibility] = useState("공개");
  const [shareScope, setShareScope] = useState("공개");
  const [progress, setProgress] = useState(80);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const retryCount = useRef(0);
  const maxRetries = 5;

  const fetchImage = async () => {
    try {
      const token = localStorage.getItem("accessToken") || "";
      const url = await getEmotionCardImage(diaryId, token);

      if (url) {
        setImageUrl(url);
        setLoading(false);
      } else {
        throw new Error("Image URL not found in result");
      }
    } catch (err) {
      retryCount.current += 1;
      if (retryCount.current < maxRetries) {
        console.warn(`⏳ 재시도 ${retryCount.current}/${maxRetries}`);
        setTimeout(fetchImage, 5000);
      } else {
        console.error("🛑 최대 재시도 도달. 기본 이미지로 대체:", err);
        setImageUrl(defaultImg);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (diaryId) {
      console.log("📌 diaryId:", diaryId);
      fetchImage();
    }
  }, [diaryId]);

  const handleRegenerate = async () => {
    const token = localStorage.getItem("accessToken") || "";
    const previousImage = imageUrl;
    setLoading(true);
    retryCount.current = 0;

    try {
      const result = await regenerateDiaryCard({
        diaryId,
        title: diaryInfo.title,
        content: diaryInfo.content,
        imageFile: diaryInfo.imageFile,
        token,
      });
      setImageUrl(result.imageUrl);
    } catch (err) {
      console.error("❌ 재생성 실패", err);
      setImageUrl(previousImage || defaultImg);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.round((offsetX / rect.width) * 100);
    setProgress(Math.min(100, Math.max(0, newProgress)));
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-0">
      <div className="bg-white w-[600px] p-8 rounded-2xl shadow-lg flex flex-col space-y-4 transition-all duration-500 relative">
        {/* 상단 우측 버튼 */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="icon-button" onClick={handleRegenerate}>
            <img src={refreshIcon} alt="재생성" className="w-6 h-6" />
          </button>
          {imageUrl && (
            <DownloadEmotionCard imageUrl={imageUrl} fileName={`emotion_card_${diaryId}.png`} />
          )}
        </div>

        {/* 감정 카드 영역 */}
        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow">
            {loading ? (
              <div className="w-64 h-64 bg-gray-300 animate-pulse flex items-center justify-center text-sm text-gray-500">
                감정 카드 생성 중...
              </div>
            ) : imageUrl ? (
              <img src={imageUrl} alt="감정 카드" className="block max-w-full h-auto rounded-lg shadow" />
            ) : (
              <div className="w-64 h-64 bg-red-100 flex items-center justify-center text-sm text-red-500">
                이미지 없음
              </div>
            )}
          </div>
        </div>

        <hr className="border-t border-gray-300 my-4" />

        {/* 피드 설정 */}
        <div>
          <p className="text-gray-600 mb-2 text-left">피드 생성 여부</p>
          <div className="flex justify-between space-x-6">
            {["공개", "비공개"].map((option) => (
              <label className="custom-radio" key={option}>
                <input
                  type="radio"
                  name="feedVisibility"
                  value={option}
                  checked={feedVisibility === option}
                  onChange={() => setFeedVisibility(option)}
                />
                <span className="custom-radio-btn"></span>
                <span className="text-gray-800 font-bold">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 공개 범위 설정 */}
        <div>
          <p className="text-gray-600 mb-2 text-left">공개 범위</p>
          <div className="flex justify-between space-x-6">
            {["공개", "요약 공개", "비공개"].map((scope) => (
              <label className="custom-radio" key={scope}>
                <input
                  type="radio"
                  name="shareScope"
                  value={scope}
                  checked={shareScope === scope}
                  onChange={() => setShareScope(scope)}
                />
                <span className="custom-radio-btn"></span>
                <span className="text-gray-800 font-bold">{scope}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 요약 공개 UI */}
        <div
          className={`transition-all duration-500 overflow-hidden ${
            shareScope === "요약 공개" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 space-y-4">
            <p className="text-gray-600 mb-2 text-left">요약본</p>
            <p className="text-gray-700 text-sm mb-4">오늘은 잔잔한 햇살 아래 조용한 시간을 보냈다.</p>
            <div className="mt-2 flex items-center">
              <span className="font-bold text-blue-500">T</span>
              <div
                className="flex-1 mx-2 bg-gray-200 rounded-full h-3 relative cursor-pointer"
                ref={progressBarRef}
                onMouseDown={updateProgress}
                onMouseMove={(e) => e.buttons === 1 && updateProgress(e)}
              >
                <div
                  className="h-3 rounded-full absolute left-0 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(to right, #4f83ff, #4caf50)`,
                  }}
                />
              </div>
              <span className="font-bold text-gray-700">F</span>
            </div>
          </div>
        </div>

        {/* 완료 버튼 */}
        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-12 rounded-lg hover:bg-blue-600"
            onClick={onPreview}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
