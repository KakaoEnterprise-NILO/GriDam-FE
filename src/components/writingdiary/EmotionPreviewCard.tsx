"use client";

import { useEffect, useRef, useState } from "react";
import StatusCard from "./StatusCard";
import RecommendedCard from "../writingdiary/RecommendationCard";
import "./EmotionPreviewCard.css";
import { uploadFeed } from "@/services/feedService"; // ✅ 새로 추가된 API 호출
import { getEmotionCardImage } from "@/services/emotionCardService"; // ✅ 추가


interface EmotionPreviewCardProps {
  diaryId: string;
  onClose: () => void;
}

export default function EmotionPreviewCard({ diaryId, onClose }: EmotionPreviewCardProps) {
  const [step, setStep] = useState<"preview" | "uploading" | "recommendation">("preview");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [emotionCardId, setEmotionCardId] = useState<number>(247); // ✅ 기본값 fallback

  const retryCount = useRef(0);
  const maxRetries = 5;

  useEffect(() => {
    const fetchEmotionCard = async () => {
      try {
        const result = await getEmotionCardImage(diaryId);

        if (!result.cardImageUrl) throw new Error("cardImageUrl is null");

        setImageUrl(result.cardImageUrl);
        setEmotion(result.emotion);
        setHashtags(result.hashtags.map((tag: any) => tag.tagName));
        setEmotionCardId(result.emotionCardId ?? 247);
      } catch (err) {
        retryCount.current += 1;

        if (retryCount.current < maxRetries) {
          console.warn(`⏳ 재시도 ${retryCount.current}/${maxRetries}`);
          setTimeout(fetchEmotionCard, 3000);
        } else {
          console.error("🛑 최대 재시도 도달. 기본 백업 데이터 사용", err);
          setImageUrl("https://objectstorage.kr-central-2.kakaocloud.com/v1/e1aa923a4373419aace9daef92f80e91/image-storage/overlay/52b0a7b9-6698-4c73-b757-7cbebe409e80.jpg");
          setEmotion("화남");
          setHashtags(["#분노", "#억울함", "#스트레스"]);
          setEmotionCardId(248);
        }
      }
    };

  if (diaryId) {
    fetchEmotionCard();
  }
}, [diaryId]);

  const handleUpload = async () => {
    setStep("uploading");

    try {
      const result = await uploadFeed(emotionCardId, "피드 내용 예시", true);
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
      <div className="bg-white w-[600px] min-h-[500px] p-8 rounded-2xl shadow-lg space-y-4 relative transition-transform duration-300 transform scale-95">

        <button
          className="absolute top-4 right-4 text-gray-500 text-lg"
          onClick={onClose}
        >
          ×
        </button>

        <div className="flex justify-between items-center mb-4">
          <div />
          <h2 className="text-lg font-bold">미리보기</h2>
          <div />
        </div>

        <div className="flex justify-center mb-4">
          <div className="rounded-lg flex flex-col items-center justify-center space-y-2">
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="감정 카드"
                  className="w-full max-w-md h-auto rounded shadow" // ⬅️ 여기 수정
                />
                {emotion && <h2 className="text-xl font-bold text-gray-700">{emotion}</h2>}
              </>
            ) : (
              <p className="text-sm text-gray-500">이미지 불러오는 중...</p>
            )}
          </div>
        </div>


        {hashtags.length > 0 && (
          <div className="text-center mb-4">
            {hashtags.map((tag) => (
              <span key={tag} className="text-blue-500 mr-2">#{tag}</span>
            ))}
          </div>
        )}

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
