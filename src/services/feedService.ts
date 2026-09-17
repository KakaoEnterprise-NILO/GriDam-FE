import type { ApiResponse } from "@/services/notificationService";
import api from "@/api/axios";

export interface Feed {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
}

export async function getUserFeedList(userId: string) {
  const res = await api.get<ApiResponse<{ feedList: Feed[] }>>(`/feed/user/${userId}`);


  return res.data.result.feedList;
}

export const deleteFeed = async (feedId: number) => {
  try {
    const res = await api.delete(`/feed/${feedId}`);
    return res.data;
  } catch (err) {
    console.error("피드 삭제 API 실패:", err);
    throw err;
  }
};

export const getFeedDetail = async (feedId: number, userId: string) => {

  const res = await api.get(`/feed/${feedId}`, {
    params: { userId },
  });


  return res.data.result; // { id, content, emotionCardId, createdAt, ... }
};
