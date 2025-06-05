// src/services/commentService.ts
import axios from "axios";

export interface CommentPayload {
  content: string;
  parentCommentId?: number | null;
}

export async function postComment(feedId: number, data: CommentPayload, token: string) {
  const res = await axios.post(`/api/feed/${feedId}/comment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return res.data.result;
}

export async function likeComment(feedId: number, commentId: number, token: string) {
  return await axios.post(`/api/feed/${feedId}/comment/${commentId}/like`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function unlikeComment(feedId: number, commentId: number, token: string) {
  return await axios.delete(`/api/feed/${feedId}/comment/${commentId}/like`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function fetchCommentList(feedId: number, token: string) {
  const res = await axios.get(`/api/feed/${feedId}/comment/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.result.commentList;
}