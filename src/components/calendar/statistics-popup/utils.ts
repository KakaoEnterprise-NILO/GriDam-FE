import type { EmotionData } from "./types"

export const getEmotionColor = (emotion: string): string => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "#FBBF24" // 노란색
    case "JOY":
    case "기쁨":
      return "#34D399" // 에메랄드색
    case "SAD":
    case "슬픔":
      return "#60A5FA" // 파란색
    case "ANXIOUS":
    case "불안":
      return "#A78BFA" // 보라색
    case "ANGRY":
    case "화남":
      return "#F87171" // 빨간색
    case "SURPRISE":
    case "놀람":
      return "#FB923C" // 주황색
    case "DISGUST":
    case "역겨움":
      return "#9CA3AF" // 회색
    case "FEAR":
    case "두려움":
      return "#6B7280" // 어두운 회색
    case "NONE":
    case "없음":
      return "#D1D5DB" // 밝은 회색
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

  // The original footer sorts the Pie data after cells and list rows are created.
  // Keep their input order separate to preserve the existing chart/color pairing.
  const displayData = [...updatedData]
  const summary = totalEntries > 0
    ? `이번 달 가장 많은 감정: ${updatedData.sort((a, b) => b.value - a.value)[0]?.emoji} ${
        updatedData.sort((a, b) => b.value - a.value)[0]?.name
      }`
    : "감정 기록을 시작해보세요"

  return { chartData: updatedData, displayData, totalEntries, summary }
}
