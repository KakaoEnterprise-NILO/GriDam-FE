export interface FeedComment {
  id: number;
  userId: string;
  content: string;
  likes: number;
  liked: boolean;
}

export interface FeedDetail {
  id: number;
  content: string;
  createdAt: string;
  emotionCardId: number;
}
