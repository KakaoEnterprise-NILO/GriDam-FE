import type { ApiResponse } from "@/services/notificationService";
export type EmotionCardApiResponse = ApiResponse<{
    cardImageUrl: string
    emotionCardId: number
    emotion: string
    emotions: { [key: string]: number }[]
    hashtags: { tagName: string }[]
}>

import api from "@/api/axios"

export const getEmotionCardImage = async (diaryId: string) => {
  try {
    const res = await api.get<EmotionCardApiResponse>("/emotion-cards/card-image", {
      params: { diaryId },
    });

    return res.data.result?.cardImageUrl || null;
  } catch (error: unknown) {
    console.error("감정 카드 이미지 조회 실패:", error);
    throw error;
  }
};



export interface EmotionCardByDateResponse {
  emotion: string;
  hashtags: string[];
  url: string;
}

type HashtagResponse = string | { tagName?: string; name?: string };

type EmotionCardByDateApiResponse = ApiResponse<{
  emotion?: string;
  hashtags?: HashtagResponse[];
  cardImageUrl?: string;
  url?: string;
} | null>;

export const getEmotionCardByDate = async (
  date: string
): Promise<EmotionCardByDateResponse | null> => {
  try {
    const res = await api.get<EmotionCardByDateApiResponse>("/emotion-cards/date", {
      params: { date },
    });

    const result = res.data.result;

    // 서버 응답 구조가 인터페이스와 다를 경우 매핑 처리
    if (result) {
      return {
        emotion: result.emotion || "",
        // 서버에서 hashtags가 객체 배열로 오는 경우 문자열 배열로 변환
        hashtags: Array.isArray(result.hashtags)
          ? result.hashtags
              .map((tag: HashtagResponse) =>
                typeof tag === 'string' ? tag : tag.tagName || tag.name || '')
              .filter(Boolean)
          : [],
        url: result.cardImageUrl || result.url || "",
      };
    }

    return null;
  } catch (err) {
    console.error("날짜 기반 감정카드 조회 실패:", err);
    return null;
  }
};
