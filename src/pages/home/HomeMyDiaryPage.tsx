import { useEffect, useState } from "react"
import MainLayout from "@/components/common/MainLayout"
import DiaryCard from "@/components/diary/DiaryCard"
import DiaryPagination from "@/components/diary/DiaryPagination"
import api from "@/api/axios"
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";

type DiaryItem = {
  diaryId: string
  title: string
  content: string
  date: string
  imageUrl: string
  hashtags: string[]
}

type ApiResponse = {
  timestamp: string
  success: boolean
  code: string
  result: DiaryItem[]
  message: string
}

export default function HomeMyDiary() {
  const [diaries, setDiaries] = useState<DiaryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 3

  const fetchDiaries = async () => {
    try {
      setLoading(true)
      setError(null)

      const diariesResponse = await api.get<ApiResponse>("/diary/list")

      if (diariesResponse.data.success) {
        setDiaries(diariesResponse.data.result)
      } else {
        setError(diariesResponse.data.message || "일기를 불러오는데 실패했습니다.")
      }

      
    } catch (err: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
      console.error("데이터 조회 실패:", err)

      if (errorResponse?.status === 401) {
        setError("로그인이 필요합니다.")
      } else {
        setError(errorResponse?.data?.message || "데이터를 불러오는데 실패했습니다.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void fetchDiaries()
  }, [])

  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const currentDiaries = diaries.slice(startIndex, startIndex + ITEMS_PER_PAGE)
  const maxPage = Math.ceil(diaries.length / ITEMS_PER_PAGE)

  const handlePrev = () => page > 1 && setPage(page - 1)
  const handleNext = () => page < maxPage && setPage(page + 1)

  const handleDiaryDeleted = (diaryId: string) => {
    setDiaries((currentDiaries) => {
      const nextDiaries = currentDiaries.filter((diary) => diary.diaryId !== diaryId)
      const newMaxPage = Math.ceil(nextDiaries.length / ITEMS_PER_PAGE)

      setPage((currentPage) => {
        if (newMaxPage === 0) return 1
        return Math.min(currentPage, newMaxPage)
      })

      return nextDiaries
    })
  }
  return (
    <MainLayout>
      <div className="mr-30 p-6 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">나의 일기</h1>
          {diaries.length > 0 && (
            <DiaryPagination page={page} maxPage={maxPage} onPrev={handlePrev} onNext={handleNext} />
          )}
          <div className="w-24" />
        </div>

        {loading && <p>불러오는 중...</p>}


        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && diaries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">아직 작성한 일기가 없습니다.</p>
            <p className="text-gray-400 text-sm mt-2">첫 번째 일기를 작성해보세요!</p>
          </div>
        )}

        <div className="space-y-4">
          {currentDiaries.map((diary) => (
            <DiaryCard
              key={diary.diaryId}
              id={diary.diaryId}
              title={diary.title}
              content={diary.content}
              date={diary.date}
              imageUrl={diary.imageUrl}
              hashtags={diary.hashtags}
              onDeleted={handleDiaryDeleted}
            />
          ))}
        </div>

      </div>
    </MainLayout>
  )
}
