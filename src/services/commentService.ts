import type { FeedComment } from "@/types/feed";
import type { ApiResponse } from "@/services/notificationService";
import api from "@/api/axios";

export const postComment = async (
  feedId: number,
  content: string,
  parentCommentId?: number
) => {
  const payload = {
    content,
    ...(parentCommentId ? { parentCommentId } : {}),
  };

  const response = await api.post(`/feed/${feedId}/comment`, payload);

  return response.data;
};

export const getCommentsByFeedId = async (feedId: number) => {
  try {

    const res = await api.get<ApiResponse<{ commentList: FeedComment[] }>>(`/feed/${feedId}/comment/list`);

    return res.data.result.commentList;
  } catch (err) {
    console.error("댓글 조회 실패:", err);
    throw err;
  }
};

export const likeComment = async (feedId: number, commentId: number) => {
  try {
    const res = await api.post(`/feed/${feedId}/comment/${commentId}/like`);
    return res.data;
  } catch (err) {
    console.error("댓글 좋아요 실패:", err);
    throw err;
  }
};

export const unlikeComment = async (feedId: number, commentId: number) => {
  const res = await api.delete(`/feed/${feedId}/comment/${commentId}/like`);
  return res.data;
};
