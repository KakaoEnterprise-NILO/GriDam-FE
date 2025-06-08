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

  console.log("📤 댓글 요청 전송:", { feedId, payload });

  const response = await api.post(`/feed/${feedId}/comment`, payload);

  console.log("✅ 댓글 작성 성공:", response.data);

  return response.data;
};



export const getCommentsByFeedId = async (feedId: number) => {
  try {
    console.log("📥 댓글 조회 요청:", feedId);

    const res = await api.get(`/feed/${feedId}/comment/list`);

    console.log("✅ 댓글 조회 응답:", res.data);

    return res.data.result.commentList;
  } catch (err) {
    console.error("❌ 댓글 조회 실패:", err);
    throw err;
  }
};

export const likeComment = async (feedId: number, commentId: number) => {
  try {
    const res = await api.post(`/feed/${feedId}/comment/${commentId}/like`);
    console.log("✅ 댓글 좋아요 완료:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 댓글 좋아요 실패:", err);
    throw err;
  }
};

// 댓글 좋아요 취소
export const unlikeComment = async (feedId: number, commentId: number) => {
  const res = await api.delete(`/feed/${feedId}/comment/${commentId}/like`);
  console.log("🚫 좋아요 취소 완료:", res.data);
  return res.data;
};