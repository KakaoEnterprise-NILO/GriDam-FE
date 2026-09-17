"use client"


import type { EmotionCardApiResponse } from "@/services/emotionCardService";
import { useState, useEffect } from "react"
import { X, WalletCards, BookOpen } from "lucide-react"
import api from "@/api/axios"
import EmotionCard from "./EmotionCard_Calendar"
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";

interface DiaryApiResponse {
  timestamp: string
  success: boolean
  code: string
  result: {
    title: string
    content: string
    imageUrl: string
  }
  message: string
}

interface DiaryPopupProps {
  open: boolean
  onClose: () => void
  date: string // YYYY-MM-DD 형태
  diaryId?: string
}

export default function DiaryPopup({ open, onClose, date, diaryId }: DiaryPopupProps) {
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
      setShowCard(false) // Always start with diary view
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

  if (!open) return null

  // 날짜 포맷팅 (YYYY-MM-DD -> YYYY년 MM월 DD일)
  const formatDate = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-")
      return `${year}년 ${Number.parseInt(month)}월 ${Number.parseInt(day)}일`
    } catch {
      return dateStr
    }
  }

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case "HAPPY":
      case "행복":
        return "#FEF3C7"
      case "JOY":
      case "기쁨":
        return "#D1FAE5"
      case "SAD":
      case "슬픔":
        return "#DBEAFE"
      case "ANXIOUS":
      case "불안":
        return "#E9D5FF"
      case "ANGRY":
      case "화남":
        return "#FEE2E2"
      case "SURPRISE":
      case "놀람":
        return "#FED7AA"
      case "DISGUST":
      case "역겨움":
        return "#F3F4F6"
      case "FEAR":
      case "두려움":
        return "#F9FAFB"
      case "NONE":
      case "없음":
        return "#F3F4F6"
      default:
        return "#F3F4F6"
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-lg h-[650px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden">
        <div className="relative text-center p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
          <p className="text-sm text-gray-500 mb-2 font-medium">{formatDate(date)}</p>
          <h2 className="text-xl font-bold text-gray-800 truncate px-8">
            {showCard ? "감정 카드" : diary?.title || "일기"}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-500 font-medium">일기를 불러오는 중...</p>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="mb-6">
                <div className="text-red-400 text-5xl mb-4">⚠️</div>
                <h3 className="text-red-600 font-semibold mb-3 text-lg">오류가 발생했습니다</h3>
                <p className="text-gray-600 leading-relaxed">{error}</p>
              </div>
              <div className="space-y-3 w-full max-w-xs">
                <button
                  onClick={() => fetchDiaryData(date)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-medium transition-colors w-full"
                >
                  다시 시도
                </button>
                <button
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors w-full"
                >
                  닫기
                </button>
              </div>
            </div>
          ) : !diary ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="text-gray-300 text-6xl mb-6">📝</div>
              <h3 className="text-gray-600 font-semibold text-lg mb-2">일기가 없습니다</h3>
              <p className="text-gray-500">해당 날짜에 작성된 일기가 없습니다.</p>
            </div>
          ) : !showCard ? (
            <div className="h-full overflow-y-auto p-6 space-y-6">
              {diary.imageUrl && (
                <div className="w-full h-56 rounded-2xl overflow-hidden shadow-lg">
                  <img
                    src={diary.imageUrl || "/placeholder.svg"}
                    alt="Diary"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=224&width=400"
                    }}
                  />
                </div>
              )}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl">
                <p className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">{diary.content}</p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              {emotionLoading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-500 font-medium">감정 카드를 불러오는 중...</p>
                </div>
              ) : emotionCard ? (
                <EmotionCard
                  front={{
                    color: getEmotionColor(emotionCard.emotion),
                    emotion: emotionCard.emotion,
                    image: emotionCard.cardImageUrl || "/placeholder.svg?height=280&width=280",
                  }}
                  back={{
                    color: getEmotionColor(emotionCard.emotion),
                    date: formatDate(date),
                    hashtags: emotionCard.hashtags?.map((tag) => tag.tagName) || (diary?.title ? [diary.title] : []),
                    chartData: Object.entries(emotionCard.emotions[0] || {}).map(([name, value]) => ({
                      name,
                      value: Number(value),
                    })),
                  }}
                />
              ) : (
                <div className="text-center">
                  <div className="text-gray-300 text-6xl mb-6">🎭</div>
                  <h3 className="text-gray-600 font-semibold text-lg mb-2">카드를 불러올 수 없습니다</h3>
                  <p className="text-gray-500">감정 카드를 불러올 수 없습니다.</p>
                </div>
              )}
            </div>
          )}
        </div>

        {diary && !loading && !error && (
          <div className="p-6 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
              <button
                onClick={() => setShowCard(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
                  ${!showCard ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                <BookOpen className="w-4 h-4" />
                일기
              </button>
              <button
                onClick={() => setShowCard(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
                  ${showCard ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                <WalletCards className="w-4 h-4" />
                감정 카드
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
