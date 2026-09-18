export type EmotionApiData = Array<{ [key: string]: number }>;
export interface EmotionCardProps {
  front: { color: string; emotion: string; image: string };
  back: {
    color: string;
    date: string;
    hashtags: string[];
    chartData?: { name: string; value: number }[];
    emotions?: EmotionApiData;
  };
  onClose?: () => void;
}
export interface EmotionChartData {
  name: string;
  value: number;
  fill: string;
}
