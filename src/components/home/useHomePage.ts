import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "@/api/axios"
import { isAxiosError } from "axios"
import type { ApiErrorResponse } from "@/api/axios"
import { useAuthStore } from "@/store/authStore"

export interface DiaryItem {
  diaryId: string
  title: string
  content: string
  date: string
  imageUrl: string
  hashtags: string[]
}

interface ApiResponse {
  timestamp: string
  success: boolean
  code: string
  result: DiaryItem[]
  message: string
}

export function useHomePage() {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore((state) => state.isAuthenticated)
  const [isLoading, setIsLoading] = useState(true)
  const [, setDiaries] = useState<DiaryItem[]>([])
  const [, setDiaryLoading] = useState(false)
  const [, setDiaryError] = useState<string | null>(null)

  useEffect(() => {
    const checkAndFetch = async () => {
      if (!isLoggedIn) {
        setIsLoading(false)
        return
      }

      setDiaryLoading(true)
      setDiaryError(null)
      try {
        const response = await api.get<ApiResponse>("/diary/list")
        if (response.data.success) {
          setDiaries(response.data.result)
          if (response.data.result.length > 0) {
            navigate("/homeDiary")
            return
          }
        } else {
          setDiaryError(response.data.message || "일기를 불러오는데 실패했습니다.")
        }
      } catch (error: unknown) {
        const response = isAxiosError<ApiErrorResponse>(error) ? error.response : undefined
        setDiaryError(response?.data?.message || "일기 목록 조회 중 오류가 발생했습니다.")
      } finally {
        setDiaryLoading(false)
        setIsLoading(false)
      }
    }

    void checkAndFetch()
  }, [isLoggedIn, navigate])

  return { isLoggedIn, isLoading, navigate }
}
