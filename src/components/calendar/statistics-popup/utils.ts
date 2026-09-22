import type { EmotionData } from "./types"

export const getEmotionColor = (emotion: string): string => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "#FBBF24"
    case "JOY":
    case "기쁨":
      return "#34D399"
    case "SAD":
    case "슬픔":
      return "#60A5FA"
    case "ANXIOUS":
    case "불안":
      return "#A78BFA"
    case "ANGRY":
    case "화남":
      return "#F87171"
    case "SURPRISE":
    case "놀람":
      return "#FB923C"
    case "DISGUST":
    case "역겨움":
      return "#9CA3AF"
    case "FEAR":
    case "두려움":
      return "#6B7280"
    case "NONE":
    case "없음":
      return "#D1D5DB"
    default:
      return "#D1D5DB"
  }
}

export function getStatisticsData(data: EmotionData[]) {
  const updatedData = data.map((item) => ({
    ...item,
    color: getEmotionColor(item.name),
  }))

  const totalEntries = updatedData.reduce((sum, item) => sum + item.value, 0)

  // 차트와 목록이 같은 감정·색상 조합을 유지하도록 표시 순서와 정렬 순서를 분리한다.
  // 차트와 목록이 같은 감정·색상 조합을 유지하도록 입력 순서를 별도로 보존한다.
  const displayData = [...updatedData]
  const summary = totalEntries > 0
    ? `이번 달 가장 많은 감정: ${updatedData.sort((a, b) => b.value - a.value)[0]?.emoji} ${
        updatedData.sort((a, b) => b.value - a.value)[0]?.name
      }`
    : "감정 기록을 시작해보세요"

  return { chartData: updatedData, displayData, totalEntries, summary }
}
