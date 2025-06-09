// ✅ 2. hooks/useEmotionCardImage.ts
import { useEffect, useState } from "react";
import { getEmotionCardImage } from "@/services/emotionCardService";

export function useEmotionCardImage(diaryId: string) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;

    const fetchImage = async () => {
      try {
        // token 파라미터 제거 (interceptor에서 자동 처리)
        const result = await getEmotionCardImage(diaryId);
        if (result) {
          setImageUrl(result);
          setLoading(false);
        } else {
          throw new Error("Image not ready");
        }
      } catch (error) {
        if (++retryCount < maxRetries) {
          console.warn(`⏳ 이미지 로딩 재시도 ${retryCount}/${maxRetries}`);
          setTimeout(fetchImage, 3000);
        } else {
          console.error("🛑 최대 재시도 도달. 이미지 로딩 실패");
          setLoading(false);
        }
      }
    };

    if (diaryId) fetchImage();
  }, [diaryId]);

  return { imageUrl, loading };
}