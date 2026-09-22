import type { ApiResponse } from "@/api/types"
import api from "./axios"

export type EmotionCardApiResponse = ApiResponse<{
  cardImageUrl: string
  emotionCardId: number
  emotion: string
  emotions: { [key: string]: number }[]
  hashtags: { tagName: string }[]
}>

export async function getEmotionCardImage(diaryId: string): Promise<string | null> {
  try {
    const response = await api.get<EmotionCardApiResponse>("/emotion-cards/card-image", {
      params: { diaryId },
    })
    return response.data.result?.cardImageUrl || null
  } catch (error: unknown) {
    console.error("감정 카드 이미지 조회 실패:", error)
    throw error
  }
}
