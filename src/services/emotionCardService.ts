import type { ApiResponse } from "@/api/types"
import api from "@/api/axios"

export interface EmotionCardByDateResponse {
  emotion: string
  hashtags: string[]
  url: string
}

type HashtagResponse = string | { tagName?: string; name?: string }
type EmotionCardByDateApiResponse = ApiResponse<{
  emotion?: string
  hashtags?: HashtagResponse[]
  cardImageUrl?: string
  url?: string
} | null>

export async function getEmotionCardByDate(
  date: string,
): Promise<EmotionCardByDateResponse | null> {
  try {
    const response = await api.get<EmotionCardByDateApiResponse>("/emotion-cards/date", {
      params: { date },
    })
    const result = response.data.result
    if (!result) return null

    return {
      emotion: result.emotion || "",
      hashtags: Array.isArray(result.hashtags)
        ? result.hashtags
            .map((tag: HashtagResponse) =>
              typeof tag === "string" ? tag : tag.tagName || tag.name || "",
            )
            .filter(Boolean)
        : [],
      url: result.cardImageUrl || result.url || "",
    }
  } catch (error) {
    console.error("날짜 기반 감정카드 조회 실패:", error)
    return null
  }
}
