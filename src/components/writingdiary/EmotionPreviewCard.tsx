import { useState } from "react";
import StatusCard from "./StatusCard";
import RecommendedCard from "../writingdiary/RecommendationCard";
import "./EmotionPreviewCard.css";
import { useFeedUpload } from "@/hooks/useFeedUpload"; // ✅ 정확한 경로와 이름으로 import

interface EmotionPreviewCardProps {
  onClose: () => void;
}

export default function EmotionPreviewCard({ onClose }: EmotionPreviewCardProps) {
  const [step, setStep] = useState<"preview" | "uploading" | "recommendation">("preview");

  const { upload } = useFeedUpload();

  const handleUpload = async () => {
    setStep("uploading");

    try {
      const token = localStorage.getItem("accessToken") || "";
      const result = await upload(1, "피드 내용 예시", true, token);
      console.log("[피드 업로드 완료]", result);
    } catch (err) {
      console.error("[피드 업로드 실패]", err);
    }
  };


  const handleStatusClose = () => {
    setStep("recommendation");
  };

  
  if (step === "uploading") {
    return <StatusCard onComplete={handleStatusClose} />;
  }

  if (step === "recommendation") {
    return <RecommendedCard />;
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50 transition-opacity duration-300">
      <div className="bg-white w-96 h-auto p-6 rounded-2xl shadow-lg space-y-4 relative transition-transform duration-300 transform scale-95">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-500 text-lg"
          onClick={onClose}
        >
          ×
        </button>

        {/* 상단 타이틀 */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-gray-500 text-lg">&#x2190;</button>
          <h2 className="text-lg font-bold">미리보기</h2>
        </div>

        {/* 감정 카드 */}
        <div className="flex justify-center mb-4">
          <div className="w-64 h-80 bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4 space-y-2">
            <h2 className="text-xl font-bold text-gray-700">PEACEFUL</h2>
            <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
            <p className="text-lg text-gray-600 font-serif">Happy</p>
          </div>
        </div>

        {/* 내용 */}
        <p className="text-gray-600 text-sm text-center mb-2">
          오늘은 잔잔한 햇살 아래 조용한 시간을 보냈다. 바람 따라 산책하며 마음도 한결 가벼워졌다.
        </p>

        {/* 해시태그 */}
        <div className="text-center mb-4">
          <span className="text-blue-500 mr-2"># 행복</span>
          <span className="text-blue-500 mr-2"># 기쁨</span>
          <span className="text-blue-500"># 평화</span>
        </div>

        {/* 업로드 버튼 */}
        <div className="flex justify-center">
          <button
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
            onClick={handleUpload}
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );
}
