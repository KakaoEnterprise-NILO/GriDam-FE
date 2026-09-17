import { useRef, useCallback, useState, useEffect } from "react"
import api from "@/api/axios"
import type { EmotionCardApiResponse } from "@/services/emotionCardService"
import { isAxiosError } from "axios"
import type { ApiErrorResponse } from "@/api/axios"

interface DiaryEntry {
  diaryId: string
  title: string
  content: string
  date: string // "2025-06-06" format
  imageUrl: string
  hashtags: string[]
}

interface DiaryListApiResponse {
  timestamp: string
  success: boolean
  code: string
  result: DiaryEntry[]
  message: string
}

export interface CalendarDiary {
  diaryId: string
  day: number
  emotion: string
  title: string
  hashtags: string[]
  date: string
  emotionData?: EmotionCardApiResponse["result"]
}

export function useCalendarDiaries(year: number, month: number) {
  const [diaries, setDiaries] = useState<CalendarDiary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Ignore responses from a previous user/month or an unmounted component.
  const requestGeneration = useRef(0)

  const fetchDiaryListData = useCallback(async () => {
    const generation = requestGeneration.current
    setLoading(true)
    setError(null)

    try {

      const response = await api.get<DiaryListApiResponse>(`/diary/list`)
      const data: DiaryListApiResponse = response.data


      if (data.success) {
        const diaryList = data.result || []

        // 테스트 데이터 추가
        const testData: DiaryEntry[] = [
          {
            diaryId: "test-diary-1",
            title: "오늘은 정말 행복한 하루였어!",
            content:
              "친구들과 함께 놀이공원에 갔다. 롤러코스터도 타고 맛있는 음식도 먹고... 정말 즐거운 시간이었다. 이런 날이 더 많았으면 좋겠다.",
            date: "2025-05-14",
            imageUrl: "/placeholder.svg?height=200&width=300",
            hashtags: ["놀이공원", "친구들", "즐거움", "행복"],
          },
          {
            diaryId: "test-diary-2",
            title: "화가 나는 하루",
            content:
              "오늘은 정말 짜증나는 일이 많았다. 지하철이 연착되어서 약속에 늦었고, 카페에서 주문한 음료도 잘못 나왔다. 하루 종일 기분이 좋지 않았다.",
            date: "2025-05-05",
            imageUrl: "/placeholder.svg?height=200&width=300",
            hashtags: ["짜증", "연착", "기분나쁨"],
          },
          {
            diaryId: "test-diary-3",
            title: "화가 나는 하루",
            content:
              "오늘은 조금 힘이 딸린다... 재미도 없고, 우울한 감정도 든다.. 내일의 나는 조금 괜찮아 지겠지..",
            date: "2025-05-17",
            imageUrl: "/placeholder.svg?height=200&width=300",
            hashtags: ["우울", "힘들", "파이팅팅"],
          },
        ]

        // 기존 데이터와 테스트 데이터 합치기
        const combinedDiaryList = [...diaryList, ...testData]


        const currentMonthDiaries = combinedDiaryList.filter((diary) => {
          const diaryDate = new Date(diary.date)
          return diaryDate.getFullYear() === year && diaryDate.getMonth() + 1 === month
        })

        const diariesWithEmotion = await Promise.all(
          currentMonthDiaries.map(async (diary) => {
            try {
              // 테스트 데이터인 경우 감정 데이터를 직접 설정
              if (diary.diaryId.startsWith("test-diary")) {
                const diaryDate = new Date(diary.date)
                let emotion = "NONE"

                if (diary.diaryId === "test-diary-1") {
                  emotion = "HAPPY" // 6월 1일 - 행복
                } else if (diary.diaryId === "test-diary-2") {
                  emotion = "ANGRY" // 6월 10일 - 화남
                }

                return {
                  diaryId: diary.diaryId,
                  day: diaryDate.getDate(),
                  emotion: emotion,
                  title: diary.title,
                  hashtags: diary.hashtags,
                  date: diary.date,
                  emotionData: {
                    cardImageUrl: "/placeholder.svg?height=280&width=280",
                    emotionCardId: Math.floor(Math.random() * 1000),
                    emotion: emotion,
                    emotions: [{ [emotion]: 100 }],
                    hashtags: [],
                  },
                } as CalendarDiary
              }

              // 실제 API 데이터인 경우 기존 로직 사용
              const emotionResponse = await api.get<EmotionCardApiResponse>(`/emotion-cards/card-image?diaryId=${diary.diaryId}`)
              const emotionData = emotionResponse.data


              const diaryDate = new Date(diary.date)
              return {
                diaryId: diary.diaryId,
                day: diaryDate.getDate(),
                emotion: emotionData.success && emotionData.result ? emotionData.result.emotion : "NONE",
                title: diary.title,
                hashtags: diary.hashtags,
                date: diary.date,
                emotionData: emotionData.success ? emotionData.result : undefined,
              }
            } catch (emotionErr: unknown) {
              console.warn(`감정 데이터 조회 실패 (diaryId: ${diary.diaryId}):`, emotionErr)


              const diaryDate = new Date(diary.date)
              return {
                diaryId: diary.diaryId,
                day: diaryDate.getDate(),
                emotion: "NONE",
                title: diary.title,
                hashtags: diary.hashtags,
                date: diary.date,
              } as CalendarDiary
            }
          }),
        )

        if (generation !== requestGeneration.current) return
        setDiaries(diariesWithEmotion)
      } else {
        throw new Error(data.message || "데이터를 가져오는데 실패했습니다.")
      }
    } catch (err: unknown) {
      if (generation !== requestGeneration.current) return
      const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
      const errorMessage = err instanceof Error ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
          ? err.message : undefined
      console.error("일기 목록 조회 실패:", err)
      if (errorResponse?.status === 401) {
        setError("로그인이 필요합니다. 다시 로그인해주세요.")
      } else {
        setError(errorResponse?.data?.message || errorMessage || "일기 목록을 가져오는데 실패했습니다.")
      }
      setDiaries([])
    } finally {
      if (generation === requestGeneration.current) setLoading(false)
    }
  }, [year, month])

  useEffect(() => {
    fetchDiaryListData()
    return () => {
      requestGeneration.current += 1
    }
  }, [fetchDiaryListData])

  return { diaries, loading, error, fetchDiaryListData }
}
