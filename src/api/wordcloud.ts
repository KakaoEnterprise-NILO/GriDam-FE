import api from "@/api/axios"

export interface EmotionWordCloud {
  emotion: string
  url: string
}

export interface WordCloudResponse {
  timestamp: string
  success: boolean
  code: string
  result: {
    imageUrls: EmotionWordCloud[]
    generatedAt: string
    nextGeneration: string
  }
  message: string
}

// 워드클라우드 생성
export const generateWordCloud = async (userId: string): Promise<WordCloudResponse> => {
  const response = await api.post(`/v1/word-cloud/generate/${userId}`)
  return response.data
}

// 워드클라우드 불러오기
export const getWordCloud = async (): Promise<WordCloudResponse> => {
  const response = await api.get("/v1/word-cloud")
  return response.data
}
