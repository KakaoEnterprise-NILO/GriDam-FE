import { useState } from "react";
import StatusCard from "./StatusCard";
import "./EmotionPreviewCard.css";

export default function EmotionPreviewCard() {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = () => {
    setIsUploading(true);
  };

  if (isUploading) {
    return <StatusCard />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-96 h-auto p-6 rounded-2xl shadow-lg space-y-4 relative">
        {/* 상단 타이틀 */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-gray-500 text-lg">&#x2190;</button>
          <h2 className="text-lg font-bold">미리보기</h2>
          <button className="text-gray-500 text-lg">×</button>
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
          오늘은 잔잔한 햇살 아래 조용한 시간을 보냈다. 바람 따라 산책하며 마음도 한결 가벼워졌다. …더보기
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
