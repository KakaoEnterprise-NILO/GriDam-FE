import type { CalendarDiary } from "@/hooks/useCalendarDiaries";
export const getEmotionColor = (emotion: string) =>
  ({
    HAPPY: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    행복: "bg-gradient-to-br from-yellow-100 to-yellow-200",
    JOY: "bg-gradient-to-br from-emerald-100 to-emerald-200",
    기쁨: "bg-gradient-to-br from-emerald-100 to-emerald-200",
    SAD: "bg-gradient-to-br from-blue-100 to-blue-200",
    슬픔: "bg-gradient-to-br from-blue-100 to-blue-200",
    ANXIOUS: "bg-gradient-to-br from-purple-100 to-purple-200",
    불안: "bg-gradient-to-br from-purple-100 to-purple-200",
    ANGRY: "bg-gradient-to-br from-rose-100 to-rose-200",
    화남: "bg-gradient-to-br from-rose-100 to-rose-200",
    SURPRISE: "bg-gradient-to-br from-orange-100 to-orange-200",
    놀람: "bg-gradient-to-br from-orange-100 to-orange-200",
    DISGUST: "bg-gradient-to-br from-gray-100 to-gray-200",
    역겨움: "bg-gradient-to-br from-gray-100 to-gray-200",
    FEAR: "bg-gradient-to-br from-slate-100 to-slate-200",
    두려움: "bg-gradient-to-br from-slate-100 to-slate-200",
    NONE: "bg-gradient-to-br from-gray-50 to-gray-100",
    없음: "bg-gradient-to-br from-gray-50 to-gray-100",
  })[emotion] || "bg-gradient-to-br from-gray-50 to-gray-100";
export const getBorderColor = (emotion: string) =>
  ({
    HAPPY: "border-yellow-300",
    행복: "border-yellow-300",
    JOY: "border-emerald-300",
    기쁨: "border-emerald-300",
    SAD: "border-blue-300",
    슬픔: "border-blue-300",
    ANXIOUS: "border-purple-300",
    불안: "border-purple-300",
    ANGRY: "border-rose-300",
    화남: "border-rose-300",
    SURPRISE: "border-orange-300",
    놀람: "border-orange-300",
    DISGUST: "border-gray-300",
    역겨움: "border-gray-300",
    FEAR: "border-slate-300",
    두려움: "border-slate-300",
    NONE: "border-gray-200",
    없음: "border-gray-200",
  })[emotion] || "border-gray-200";
export const getEmotionEmoji = (emotion: string) =>
  ({
    HAPPY: "😊",
    행복: "😊",
    JOY: "😄",
    기쁨: "😄",
    SAD: "😢",
    슬픔: "😢",
    ANXIOUS: "😰",
    불안: "😰",
    ANGRY: "😠",
    화남: "😠",
    SURPRISE: "😲",
    놀람: "😲",
    DISGUST: "🤢",
    역겨움: "🤢",
    FEAR: "😨",
    두려움: "😨",
    NONE: "😐",
    없음: "😐",
  })[emotion] || "😐";
export function getStatisticsData(diaries: CalendarDiary[]) {
  const counts: Record<string, number> = {};
  diaries.forEach(({ emotion }) => {
    counts[emotion] = (counts[emotion] || 0) + 1;
  });
  return Object.entries(counts).map(([emotion, value]) => ({
    name: emotion,
    value,
    color: getEmotionColor(emotion).replace("bg-", "#"),
    emoji: getEmotionEmoji(emotion),
  }));
}
