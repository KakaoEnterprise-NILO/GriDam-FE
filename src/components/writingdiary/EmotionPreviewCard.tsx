
import type { EmotionCardApiResponse } from "@/api/emotionCard";
import { useEffect, useRef, useState } from "react";
import StatusCard from "./StatusCard";
import RecommendedCard from "../writingdiary/RecommendationCard";
import "./EmotionPreviewCard.css";
import api from "@/api/axios";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";


interface EmotionPreviewCardProps {
  diaryId: string;
  onClose: () => void;
}

export default function EmotionPreviewCard({ diaryId, onClose }: EmotionPreviewCardProps) {
  const [step, setStep] = useState<"preview" | "uploading" | "recommendation">("preview");

  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [emotion, setEmotion] = useState<string | null>(null);
  const [hashtags, setHashtags] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const retryRequest = useRef<(() => void) | null>(null);

  const retryCount = useRef(0);
  const retryTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelRequest = useRef<(() => void) | null>(null);
  const maxRetries = 5;

  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    let busy = true;
    setLoading(true);
    setError(null);
    setImageUrl(null);
    setEmotion(null);
    setHashtags([]);
    retryCount.current = 0;

    const clearRetryTimeout = () => {
      if (retryTimeout.current !== null) {
        clearTimeout(retryTimeout.current);
        retryTimeout.current = null;
      }
    };

    const cleanup = () => {
      active = false;
      clearRetryTimeout();
      controller.abort();
    };
    cancelRequest.current = cleanup;

    const fetchEmotionCard = async () => {
      if (!active) return;
      try {
        const res = await api.get<EmotionCardApiResponse>("/emotion-cards/card-image", {
          params: { diaryId },
          signal: controller.signal,
        });

        if (!active) return;

        const result = res.data.result;
        if (!result.cardImageUrl) throw new Error("cardImageUrl is null");

        clearRetryTimeout();
        setImageUrl(result.cardImageUrl);
        setEmotion(result.emotion);
        setHashtags([...new Set(result.hashtags
          .map((tag) => tag.tagName.replace(/#/g, "").trim())
          .filter(Boolean))]);
        setError(null);
        setLoading(false);
        busy = false;
      } catch (err) {
        if (!active) return;

        setImageUrl(null);
        setEmotion(null);
        setHashtags([]);
        retryCount.current += 1;

        if (retryCount.current < maxRetries) {
          clearRetryTimeout();
          retryTimeout.current = setTimeout(() => {
            retryTimeout.current = null;
            void fetchEmotionCard();
          }, 3000);
        } else {
          console.error("Emotion card request failed:", err);
          clearRetryTimeout();
          setError("감정 카드를 불러오지 못했습니다. 다시 시도해주세요.");
          setLoading(false);
          busy = false;
        }
      }
    };

    const retry = () => {
      if (!active || busy) return;
      busy = true;
      clearRetryTimeout();
      retryCount.current = 0;
      setError(null);
      setLoading(true);
      void fetchEmotionCard();
    };
    retryRequest.current = retry;

    if (diaryId) {
      void fetchEmotionCard();
    }

    return () => {
      cleanup();
      if (retryRequest.current === retry) retryRequest.current = null;
      if (cancelRequest.current === cleanup) cancelRequest.current = null;
    };
  }, [diaryId]);

  const handleClose = () => {
    cancelRequest.current?.();
    onClose();
  };

  const handleStatusClose = () => {
    setStep("recommendation");
  };

  const handleUpload = () => {
    setStep("uploading");
  };

  if (step === "uploading") {
    return <StatusCard onComplete={handleStatusClose} />;
  }

  if (step === "recommendation") {
    return <RecommendedCard />;
  }

  return (
    <Dialog open onOpenChange={(open) => !open && handleClose()}>
      <DialogContent showClose={false} className="bg-white w-[calc(100vw-2rem)] max-w-[600px] max-h-[90vh] overflow-y-auto min-h-[500px] p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg space-y-4 relative transition-transform duration-300 transform scale-95">
        <DialogTitle className="sr-only">Emotion card preview</DialogTitle>
        <DialogDescription className="sr-only">Review the generated emotion card and upload it.</DialogDescription>

        <button type="button"
          className="absolute top-4 right-4 text-gray-500 text-lg"
          onClick={handleClose}
          aria-label="Close emotion card preview"
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
            {error ? (
              <div role="alert" className="space-y-4 text-center">
                <p className="text-sm text-red-600">{error}</p>
                <button
                  type="button"
                  onClick={() => retryRequest.current?.()}
                  disabled={loading}
                  className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
                >
                  다시 시도
                </button>
              </div>
            ) : !loading && imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt="감정 카드"
                  className="w-full max-w-md h-auto rounded shadow"
                />
                {emotion && <h2 className="text-xl font-bold text-gray-700">{emotion}</h2>}
              </>
            ) : (
              <p role="status" aria-live="polite" className="text-sm text-gray-500">이미지 불러오는 중...</p>
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
            type="button"
            onClick={handleUpload}
            disabled={loading || Boolean(error) || !imageUrl}
            className="bg-blue-500 text-white w-full py-2 rounded-lg hover:bg-blue-600"
          >
            업로드
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
