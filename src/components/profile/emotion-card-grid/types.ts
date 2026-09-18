import type { EmotionCardApiResponse } from "@/services/emotionCardService"
export type ProfileEmotionCard = Partial<EmotionCardApiResponse["result"]>
export type ProfileEmotionCardResult = ProfileEmotionCard & { cardInfoList?: ProfileEmotionCard[] }
export interface EmotionCardData { id:string; src:string; label:string; mood:string; date:string; hashtags?:string[] }
export interface EmotionCardGridProps { userId?:string }
