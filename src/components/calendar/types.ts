import type { EmotionCardApiResponse } from "@/api/emotionCard"

export interface CalendarDiary {
  diaryId: string
  day: number
  emotion: string
  title: string
  hashtags: string[]
  date: string
  emotionData?: EmotionCardApiResponse["result"]
}

export interface DiaryEntry {
  diaryId: string
  title: string
  content: string
  date: string // "2025-06-06" 형식
  imageUrl: string
  hashtags: string[]
}

export interface DiaryListApiResponse {
  timestamp: string
  success: boolean
  code: string
  result: DiaryEntry[]
  message: string
}
