import type { EmotionCardApiResponse } from "@/services/emotionCardService"

export interface DiaryApiResponse {
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

export interface DiaryPopupProps {
  open: boolean
  onClose: () => void
  date: string // YYYY-MM-DD 형태
  diaryId?: string
}

export type DiaryData = DiaryApiResponse["result"]
export type EmotionCardData = EmotionCardApiResponse["result"]

export interface DiaryPopupHeaderProps {
  date: string
  title: string
  onClose: () => void
}
export interface DiaryPopupTabsProps {
  showCard: boolean
  onSelect: (showCard: boolean) => void
}
export interface DiaryPopupBodyProps {
  diary: DiaryData | null
  loading: boolean
  error: string | null
  onRetry: () => void
  onClose: () => void
}
export interface DiaryEmotionCardProps {
  diary: DiaryData
  date: string
  emotionCard: EmotionCardData | null
  emotionLoading: boolean
}
