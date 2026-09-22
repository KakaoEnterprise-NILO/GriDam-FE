import api from "@/api/axios"
import type { EmotionCardApiResponse } from "@/api/emotionCard"
import type { CalendarDiary, DiaryListApiResponse } from "@/components/calendar/types"
import { calendarSampleDiaries } from "@/components/calendar/constants"
import {
  filterDiariesByMonth,
  toCalendarDiary,
  toSampleCalendarDiary,
} from "@/components/calendar/utils"

export async function getCalendarDiaries(year: number, month: number): Promise<CalendarDiary[]> {
  const { data } = await api.get<DiaryListApiResponse>("/diary/list")
  if (!data.success) {
    throw new Error(data.message || "데이터를 가져오는데 실패했습니다.")
  }

  const diaries = filterDiariesByMonth(
    [...(data.result || []), ...calendarSampleDiaries],
    year,
    month,
  )

  return Promise.all(diaries.map(async (diary) => {
    try {
      if (diary.diaryId.startsWith("test-diary")) {
        return toSampleCalendarDiary(diary, Math.floor(Math.random() * 1000))
      }
      const response = await api.get<EmotionCardApiResponse>(
        `/emotion-cards/card-image?diaryId=${diary.diaryId}`,
      )
      return toCalendarDiary(diary, response.data)
    } catch (error: unknown) {
      console.warn(`감정 데이터 조회 실패 (diaryId: ${diary.diaryId}):`, error)
      return toCalendarDiary(diary)
    }
  }))
}
