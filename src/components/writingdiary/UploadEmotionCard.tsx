import { useEffect, useState, useRef } from "react";
import "./UploadEmotionCard.css";
import refreshIcon from "../../assets/icons/refresh_button_icon.svg";
import downloadIcon from "../../assets/icons/download_button_icon.svg";
import axios from "axios";

interface UploadEmotionCardProps {
  onPreview: () => void;
  diaryId: string;
}

export default function UploadEmotionCard({ onPreview, diaryId }: UploadEmotionCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [feedVisibility, setFeedVisibility] = useState("공개");
  const [shareScope, setShareScope] = useState("공개");
  const [progress, setProgress] = useState(80);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log("📌 UploadEmotionCard에 전달된 diaryId:", diaryId);
    let retryCount = 5;
    const maxRetries = 60;

    const fetchImage = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get("/api/emotion-cards/card-image", {
          params: { diaryId },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.result) {
          setImageUrl(res.data.result);
          setLoading(false);
        } else {
          throw new Error("Image not ready yet");
        }
      } catch (err) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchImage, 5000);
        } else {
          setLoading(false);
          console.error("🛑 감정 카드 이미지 로딩 실패:", err);
        }
      }
    };

    if (diaryId) {
      fetchImage();
    }
  }, [diaryId]);

  const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.round((offsetX / rect.width) * 100);
    setProgress(Math.min(100, Math.max(0, newProgress)));
  };

  const handleCompleteClick = () => {
    if (shareScope === "요약 공개") {
      onPreview();
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-0">
      <div className="bg-white w-[600px] p-8 rounded-2xl shadow-lg flex flex-col space-y-4 transition-all duration-500 relative">
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="icon-button" onClick={() => console.log("재생성 클릭됨")}>
            <img src={refreshIcon} alt="재생성" className="w-6 h-6" />
          </button>
          <button className="icon-button" onClick={() => console.log("다운로드 클릭됨")}>
            <img src={downloadIcon} alt="다운로드" className="w-6 h-6" />
          </button>
        </div>

        {/* 감정 카드 */}
      <div className="flex justify-center">
        <div className="rounded-lg overflow-hidden shadow">
          {loading ? (
            <div className="w-64 h-64 bg-gray-300 animate-pulse flex items-center justify-center text-sm text-gray-500">
              감정 카드 생성 중...
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt="감정 카드"
              className="block max-w-full h-auto rounded-lg shadow"
            />
          ) : (
            <div className="w-64 h-64 bg-red-100 flex items-center justify-center text-sm text-red-500">
              이미지 없음
            </div>
          )}
        </div>
      </div>
        <hr className="border-t border-gray-300 my-4" />

        {/* feedVisibility & shareScope 동일 */}
        {/* 생략 없이 유지해도 됩니다 – 디자인 변동 없음 */}

        <div>
          <p className="text-gray-600 mb-2 text-left">피드 생성 여부</p>
          <div className="flex justify-between space-x-6">
            <label className="custom-radio">
              <input type="radio" name="feedVisibility" value="공개" checked={feedVisibility === "공개"} onChange={() => setFeedVisibility("공개")} />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">공개</span>
            </label>
            <label className="custom-radio">
              <input type="radio" name="feedVisibility" value="비공개" checked={feedVisibility === "비공개"} onChange={() => setFeedVisibility("비공개")} />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">비공개</span>
            </label>
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-2 text-left">공개 범위</p>
          <div className="flex justify-between space-x-6">
            {["공개", "요약 공개", "비공개"].map((scope) => (
              <label className="custom-radio" key={scope}>
                <input type="radio" name="shareScope" value={scope} checked={shareScope === scope} onChange={() => setShareScope(scope)} />
                <span className="custom-radio-btn"></span>
                <span className="text-gray-800 font-bold">{scope}</span>
              </label>
            ))}
          </div>
        </div>

        <div className={`transition-all duration-500 overflow-hidden ${shareScope === "요약 공개" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
          <div className="mt-4 space-y-4">
            <p className="text-gray-600 mb-2 text-left">요약본</p>
            <p className="text-gray-700 text-sm mb-4">오늘은 잔잔한 햇살 아래 조용한 시간을 보냈다.</p>
            <div className="mt-2 flex items-center">
              <span className="font-bold text-blue-500">T</span>
              <div className="flex-1 mx-2 bg-gray-200 rounded-full h-3 relative cursor-pointer" ref={progressBarRef} onMouseDown={updateProgress} onMouseMove={(e) => e.buttons === 1 && updateProgress(e)}>
                <div className="h-3 rounded-full absolute left-0 transition-all duration-300" style={{ width: `${progress}%`, background: `linear-gradient(to right, #4f83ff, #4caf50)` }}></div>
              </div>
              <span className="font-bold text-gray-700">F</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 text-white py-2 px-12 rounded-lg hover:bg-blue-600" onClick={handleCompleteClick}>
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
