import type { EmotionCardDataType } from "./types";
export const emotionColorMap: Record<string, string> = {
  행복: "#FFD700",
  슬픔: "#4169E1",
  기쁨: "#FFA500",
  불안: "#9370DB",
  화남: "#DC143C",
  놀람: "#FF6347",
  역겨움: "#696969",
  두려움: "#8B008B",
  없음: "#CCCCCC",
  default: "#CCCCCC",
};
export const EMPTY_CARD_COLOR = "#E5E7EB";
export function getCardEmotionProps(data: EmotionCardDataType, date: string) {
  return {
    front: { color: data.color, emotion: data.emotion, image: data.image },
    back: {
      color: data.color,
      date: data.date || date,
      hashtags: data.hashtags,
      emotions: data.emotions,
    },
  };
}
