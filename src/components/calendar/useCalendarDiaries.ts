import { useRef, useCallback, useState, useEffect } from "react"
import { getCalendarDiaries } from "@/services/calendarDiaryService"
import type { CalendarDiary } from "./types"
import { getCalendarDiaryError } from "./utils"

export function useCalendarDiaries(year: number, month: number) {
  const [diaries, setDiaries] = useState<CalendarDiary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const requestGeneration = useRef(0)

  const fetchDiaryListData = useCallback(async () => {
    const generation = requestGeneration.current
    setLoading(true)
    setError(null)

    try {
      const diariesWithEmotion = await getCalendarDiaries(year, month)
      if (generation !== requestGeneration.current) return
      setDiaries(diariesWithEmotion)
    } catch (err: unknown) {
      if (generation !== requestGeneration.current) return
      console.error("일기 목록 조회 실패:", err)
      setError(getCalendarDiaryError(err))
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
