export interface EmotionCardDataType {
  color: string;
  emotion: string;
  image: string;
  date: string;
  hashtags: string[];
  emotions: Array<{ [key: string]: number }>;
  emotionCardId: number;
}
export interface DiaryCardProps {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl: string;
  hashtags: string[];
  onDelete: (diaryId: string) => void;
}
