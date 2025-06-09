import { useState } from "react";
import EmotionPreviewCard from "../components/writingdiary/EmotionPreviewCard";
import StatusCard from "../components/writingdiary/StatusCard";
import RecommendedCard from "../components/writingdiary/RecommendationCard";

export default function EmotionFlowContainer() {
  const [step, setStep] = useState<"preview" | "uploading" | "recommendation">("preview");
  const [diaryId, _] = useState<string | null>("abc123"); // 실제 값 또는 props로 받아오기

  if (!diaryId) return <div>다이어리 ID 없음</div>;

  return (
    <>
      {step === "preview" && (
        <EmotionPreviewCard
          diaryId={diaryId}
          onClose={() => console.log("닫기")}
        />
      )}
      {step === "uploading" && (
        <StatusCard onComplete={() => setStep("recommendation")} />
      )}
      {step === "recommendation" && <RecommendedCard />}
    </>
  );
}