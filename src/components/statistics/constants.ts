import type { EmotionWordCloud, UserInfo } from "./types";

export const sampleUserInfo: UserInfo = {
  userId: "user123",
  userName: "김범진",
  diaryCount: 1,
  followerCount: 3,
};
export const sampleWordClouds: EmotionWordCloud[] = [
  { emotion: "행복", url: "/wordcloud.png" },
  { emotion: "불안", url: "/wordcloud2.png" },
  { emotion: "화남", url: "/wordcloud3.png" },
  { emotion: "기쁨", url: "/wordcloud.png" },
  { emotion: "슬픔", url: "/wordcloud.png" },
  { emotion: "놀람", url: "/wordcloud.png" },
  { emotion: "역겨움", url: "/wordcloud.png" },
  { emotion: "두려움", url: "/wordcloud.png" },
];
