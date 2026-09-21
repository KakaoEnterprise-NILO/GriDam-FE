import { useCallback, useEffect, useRef, useState } from "react"
import { isAxiosError } from "axios"
import type { ApiResponse } from "@/services/notificationService"
import type { ApiErrorResponse } from "@/api/axios"
import api from "@/api/axios"
import type { EmotionCardData, ProfileEmotionCardResult } from "./types"
import { transformEmotionCards } from "./utils"
export function useEmotionCardGrid(userId?: string) {
  const [cards, setCards] = useState<EmotionCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const requestGeneration = useRef(0)
  const fetchEmotionCards = useCallback(async () => {
    const generation = requestGeneration.current
    try {
      setLoading(true)
      setError(null)
      const res = await api.get<ApiResponse<ProfileEmotionCardResult | null>>(
        "/emotion-cards",
        { params: userId ? { userId, size: 9 } : { size: 9 } }
      )
      if (generation !== requestGeneration.current) return
      if (res.data.success)
        setCards(transformEmotionCards(res.data.result, Boolean(userId)))
      else {
        setCards([])
        setError(
          res.data.message ||
            (userId
              ? "감정 카드를 불러올 수 없습니다."
              : "내 감정 카드를 불러올 수 없습니다.")
        )
      }
    } catch (err: unknown) {
      if (generation !== requestGeneration.current) return
      const response = isAxiosError<ApiErrorResponse>(err)
        ? err.response
        : undefined
      const message =
        err instanceof Error
          ? err.message
          : typeof err === "object" &&
              err !== null &&
              "message" in err &&
              typeof err.message === "string"
            ? err.message
            : undefined
      console.error("감정 카드 불러오기 실패:", err)
      setCards([])
      if (response?.status === 403)
        setError("이 사용자의 감정 카드는 비공개로 설정되어 있습니다.")
      else if (response?.status === 404) setError("사용자를 찾을 수 없습니다.")
      else
        setError(
          response?.data?.message ||
            message ||
            "감정 카드를 불러오는 중 오류가 발생했습니다."
        )
    } finally {
      if (generation === requestGeneration.current) setLoading(false)
    }
  }, [userId])
  useEffect(() => {
    fetchEmotionCards()
    return () => {
      requestGeneration.current += 1
    }
  }, [fetchEmotionCards])
  return { cards, loading, error, fetchEmotionCards }
}
