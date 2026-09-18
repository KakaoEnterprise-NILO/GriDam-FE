import type { DiaryData, EmotionCardData } from "./types"

export const formatDate = (dateStr: string) => {
  try {
    const [year, month, day] = dateStr.split("-")
    return `${year}년 ${Number.parseInt(month)}월 ${Number.parseInt(day)}일`
  } catch {
    return dateStr
  }
}

export const getEmotionColor = (emotion: string) => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "#FEF3C7"
    case "JOY":
    case "기쁨":
      return "#D1FAE5"
    case "SAD":
    case "슬픔":
      return "#DBEAFE"
    case "ANXIOUS":
    case "불안":
      return "#E9D5FF"
    case "ANGRY":
    case "화남":
      return "#FEE2E2"
    case "SURPRISE":
    case "놀람":
      return "#FED7AA"
    case "DISGUST":
    case "역겨움":
      return "#F3F4F6"
    case "FEAR":
    case "두려움":
      return "#F9FAFB"
    case "NONE":
    case "없음":
      return "#F3F4F6"
    default:
      return "#F3F4F6"
  }
}

export function getEmotionCardProps(emotionCard: EmotionCardData, diary: DiaryData, date: string) {
  return {
    front: {
      color: getEmotionColor(emotionCard.emotion),
      emotion: emotionCard.emotion,
      image: emotionCard.cardImageUrl || "/placeholder.svg?height=280&width=280",
    },
    back: {
      color: getEmotionColor(emotionCard.emotion),
      date: formatDate(date),
      hashtags: emotionCard.hashtags?.map((tag) => tag.tagName) || (diary?.title ? [diary.title] : []),
      chartData: Object.entries(emotionCard.emotions[0] || {}).map(([name, value]) => ({
        name,
        value: Number(value),
      })),
    },
  }
}
