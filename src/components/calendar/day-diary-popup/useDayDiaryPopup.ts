import { useState, useEffect } from "react"
import { isAxiosError } from "axios"
import api, { type ApiErrorResponse } from "@/api/axios"
import type { EmotionCardApiResponse } from "@/api/emotionCard"
import type { DiaryApiResponse, DiaryPopupProps } from "./types"

export function useDayDiaryPopup({ open, date, diaryId }: Pick<DiaryPopupProps, "open" | "date" | "diaryId">) {
  const [showCard, setShowCard] = useState(false)
  const [diary, setDiary] = useState<DiaryApiResponse["result"] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [emotionCard, setEmotionCard] = useState<EmotionCardApiResponse["result"] | null>(null)
  const [emotionLoading, setEmotionLoading] = useState(false)

  const fetchDiaryData = async (date: string) => {
    setLoading(true)
    setError(null)

    try {

      const response = await api.get(`/diary?date=${date}`)
      const data: DiaryApiResponse = response.data

      if (data.success) {
        setDiary(data.result)
      } else {
        throw new Error(data.message || "일기를 불러오는데 실패했습니다.")
      }
    } catch (err: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
      const errorMessage = err instanceof Error ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
          ? err.message : undefined
      console.error("일기 조회 실패:", err)

      if (errorResponse?.status === 500) {
        const errorData = errorResponse.data
        if (errorData?.code === "COMMON500") {
          if (typeof errorData.result === "string" && errorData.result.includes("Query did not return a unique result")) {
            setError("해당 날짜에 여러 개의 일기가 있습니다. 서버 관리자에게 문의해주세요.")
          } else {
            setError("서버에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
          }
        } else {
          setError("서버 오류가 발생했습니다.")
        }
      } else if (errorResponse?.status === 404) {
        setError("해당 날짜에 작성된 일기가 없습니다.")
      } else if (errorResponse?.status === 401) {
        setError("로그인이 필요합니다.")
      } else if (errorResponse?.status === 403) {
        setError("일기를 조회할 권한이 없습니다.")
      } else {
        setError(errorResponse?.data?.message || errorMessage || "일기를 불러오는데 실패했습니다.")
      }
      setDiary(null)
    } finally {
      setLoading(false)
    }
  }

  const fetchEmotionCardData = async (diaryId: string) => {
    setEmotionLoading(true)
    try {
      const response = await api.get(`/emotion-cards/card-image?diaryId=${diaryId}`)
      const data: EmotionCardApiResponse = response.data

      if (data.success && data.result) {
        setEmotionCard(data.result)
      } else {
        throw new Error(data.message || "감정 카드를 불러오는데 실패했습니다.")
      }
    } catch (err: unknown) {
      console.error("감정 카드 조회 실패:", err)
      setEmotionCard(null)
    } finally {
      setEmotionLoading(false)
    }
  }

  useEffect(() => {
    if (open && date) {
      fetchDiaryData(date)
      setShowCard(false) // 팝업을 열 때는 항상 일기 화면부터 표시한다.
    }
  }, [open, date])

  // 일기 데이터가 로드되면 감정 카드 데이터도 가져오기
  useEffect(() => {
    if (diary && diaryId) {
      fetchEmotionCardData(diaryId)
    }
  }, [diary, diaryId])

  // 팝업이 닫힐 때 상태 초기화
  useEffect(() => {
    if (!open) {
      setShowCard(false)
      setDiary(null)
      setError(null)
      setEmotionCard(null)
    }
  }, [open])

  return {
    showCard, setShowCard, diary, loading, error, emotionCard, emotionLoading,
    retryDiary: () => fetchDiaryData(date),
  }
}
