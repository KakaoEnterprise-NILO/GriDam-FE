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
        const token = localStorage.getItem("accessToken") || "";
        const result = await getEmotionCardImage(diaryId, token);
        if (result) {
          setImageUrl(result);
          setLoading(false);
        } else {
          throw new Error("Image not ready");
        }
      } catch {
        if (++retryCount < maxRetries) {
          setTimeout(fetchImage, 3000);
        } else {
          setLoading(false);
        }
      }
    };

    if (diaryId) fetchImage();
  }, [diaryId]);

  return { imageUrl, loading };
}
