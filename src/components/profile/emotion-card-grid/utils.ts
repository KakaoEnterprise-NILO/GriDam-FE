import type {
  ProfileEmotionCard,
  ProfileEmotionCardResult,
  EmotionCardData
} from "./types"
const toCard = (card: ProfileEmotionCard): EmotionCardData => ({
  id:
    card.emotionCardId?.toString() ??
    JSON.stringify([
      card.cardImageUrl,
      card.emotion,
      card.hashtags?.map((tag) => tag.tagName)
    ]),
  src: card.cardImageUrl || "/placeholder.svg?height=200&width=160",
  label: card.emotion || "감정",
  mood: card.emotions?.[0] ? Object.keys(card.emotions[0])[0] : "Neutral",
  date: new Date().toLocaleDateString("ko-KR"),
  hashtags: card.hashtags?.map((tag) => tag.tagName) || []
})
export function transformEmotionCards(
  result: ProfileEmotionCardResult | null,
  includeFallback: boolean
): EmotionCardData[] {
  if (!result) return []
  if (Array.isArray(result.cardInfoList)) return result.cardInfoList.map(toCard)
  if (result.emotionCardId) return [toCard(result)]
  return includeFallback
    ? [
        {
          id: "temp-1",
          src: "/placeholder.svg?height=200&width=160",
          label: "감정",
          mood: "Neutral",
          date: new Date().toLocaleDateString("ko-KR"),
          hashtags: ["#태그"]
        }
      ]
    : []
}
