import { create } from "zustand"
import type { ApiResponse } from "@/services/notificationService"
import api from "@/api/axios"

export interface EmotionCardDataType {
  color: string
  emotion: string
  image: string
  date: string
  hashtags: string[]
  chartData: { name: string; value: number }[]
  diaryId: number
}

export interface Diary {
  id: number
  title: string
  content: string
  date: string
  image?: string
  emotion?: string
  userUploadImage?: string
  color?: string
  hashtags?: string[]
}

type DiaryListItem = Pick<Diary, "title" | "content" | "date" | "hashtags"> & {
  id?: Diary["id"]
  imageUrl?: string
}

interface DiaryState {
  diaries: Diary[]
  emotionCards: EmotionCardDataType[]
  loading: boolean
  error: string | null
  fetchDiaries: () => Promise<void>
  fetchEmotionCards: () => Promise<void>
}

export const useDiaryStore = create<DiaryState>((set) => ({
  diaries: [],
  emotionCards: [],
  loading: false,
  error: null,
  fetchDiaries: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get<ApiResponse<DiaryListItem[]>>("/diary/list")
      const diaries = response.data.result.map((item, index) => ({
        id: item.id ?? index,
        title: item.title,
        content: item.content,
        date: item.date,
        image: item.imageUrl,
        emotion: "",
        userUploadImage: item.imageUrl || "",
        color: "",
        hashtags: item.hashtags || [],
      }))
      set({ loading: false, diaries })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch diaries"
      set({ loading: false, error: message })
      throw error
    }
  },
  fetchEmotionCards: async () => {
    set({ loading: true, error: null })
    try {
      const response = await api.get<{ data: { result: EmotionCardDataType[] } }>("/emotion-cards")
      set({ loading: false, emotionCards: response.data.data.result })
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to fetch emotion cards"
      set({ loading: false, error: message })
      throw error
    }
  },
}))
