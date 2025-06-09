// services/emotionCardService.ts
import axios from "axios";
import api from "@/api/axios" // ✅ 커스텀 axios 인스턴스를 불러오기

export const getEmotionCardImage = async (diaryId: string, token: string) => {
  const res = await axios.get("/api/emotion-cards/card-image", {
    params: { diaryId },
    headers: { Authorization: `Bearer ${token}` },
  });

  return res.data.result?.cardImageUrl || null;
};

// ✅ 2. 날짜로 감정 카드 정보 조회 (감정, 해시태그, 이미지 URL)
export interface EmotionCardByDateResponse {
  emotion: string;
  hashtags: string[];
  url: string;
}

export const getEmotionCardByDate = async (
  date: string
): Promise<EmotionCardByDateResponse | null> => {
  try {
    const res = await api.get("/emotion-cards/date", {
      params: { date },
    });
    console.log("📅 날짜 기반 감정카드 응답:", res.data.result);
    return res.data.result;
  } catch (err) {
    console.error("❌ 날짜 기반 감정카드 조회 실패:", err);
    return null;
  }
};