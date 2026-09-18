import { useEffect, useState } from "react";
import type React from "react";
import type { EmotionCardProps } from "./types";
import { EMOTION_CHART_COLORS, EMOTION_NAME_MAP } from "./constants";

export function useEmotionCard(
  emotions: EmotionCardProps["back"]["emotions"],
  chartData: EmotionCardProps["back"]["chartData"],
) {
  const [flipped, setFlipped] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showFullscreenImage, setShowFullscreenImage] = useState(false);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleImageError = () => {
    if (!imageError) setImageError(true);
  };
  const handleImageLoad = () => setImageLoaded(true);
  const handleExpandImage = (event: React.MouseEvent) => {
    event.stopPropagation();
    setShowFullscreenImage(true);
  };
  const convert = (items: NonNullable<EmotionCardProps["back"]["emotions"]>) =>
    items
      .flatMap((item) =>
        Object.entries(item)
          .filter(([, value]) => typeof value === "number" && value >= 0)
          .map(([key, value]) => ({
            name: EMOTION_NAME_MAP[key] || key,
            value: Math.round(value * 100),
          })),
      )
      .sort((a, b) => b.value - a.value);
  const data =
    emotions && emotions.length > 0
      ? convert(emotions)
      : chartData && chartData.length > 0
        ? chartData
        : [];
  const chartDataWithColors = data.map((item, index) => ({
    ...item,
    fill:
      EMOTION_CHART_COLORS[item.name] ||
      EMOTION_CHART_COLORS[`default${(index % 5) + 1}`] ||
      "#CCCCCC",
  }));
  return {
    flipped,
    setFlipped,
    imageError,
    imageLoaded,
    showFullscreenImage,
    setShowFullscreenImage,
    handleImageError,
    handleImageLoad,
    handleExpandImage,
    chartDataWithColors,
  };
}
