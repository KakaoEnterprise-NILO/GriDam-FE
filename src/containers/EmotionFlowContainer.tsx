import { useState } from "react";
import EmotionPreviewCard from "../components/writingdiary/EmotionPreviewCard";
import StatusCard from "../components/writingdiary/StatusCard";
import RecommendedCard from "../components/writingdiary/RecommendationCard";

export default function EmotionFlowContainer() {
  const [step, setStep] = useState<"preview" | "uploading" | "recommendation">("preview");

  return (
    <>
      {step === "preview" && <EmotionPreviewCard onUpload={() => setStep("uploading")} />}
      {step === "uploading" && <StatusCard onComplete={() => setStep("recommendation")} />}
      {step === "recommendation" && <RecommendedCard />}
    </>
  );
}
