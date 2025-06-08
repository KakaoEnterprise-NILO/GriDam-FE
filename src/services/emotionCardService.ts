// services/emotionCardService.ts
import axios from "axios";

export const getEmotionCardImage = async (diaryId: string, token: string) => {
  const res = await axios.get("/api/emotion-cards/card-image", {
    params: { diaryId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.result?.cardImageUrl || null;
};
