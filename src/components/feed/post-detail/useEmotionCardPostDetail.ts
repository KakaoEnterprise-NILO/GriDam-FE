import { isAxiosError } from "axios";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { postComment, getCommentsByFeedId, likeComment, unlikeComment } from "@/api/comment";
import { getFeedDetail } from "@/api/feed";
import type { FeedComment, FeedDetail } from "@/types/feed";
import { MIN_COMMENT_LENGTH } from "./constants";
import { updateCommentLike } from "./utils";

export function useEmotionCardPostDetail(feedId: number) {
  const userId = useAuthStore((state) => state.userId);
  const userError = useAuthStore((state) => state.userError);
  const retryUser = useAuthStore((state) => state.loadCurrentUser);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<FeedComment[]>([]);
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [replyTargetUser, setReplyTargetUser] = useState<string | null>(null);

  const [feedDetail, setFeedDetail] = useState<FeedDetail | null>(null);

  useEffect(() => {
    setLoadError(null);
    setFeedDetail(null);
    setComments([]);
    setComment("");
    setReplyTargetId(null);
    setReplyTargetUser(null);
    if (!userId || !Number.isSafeInteger(feedId) || feedId <= 0) return;
    let active = true;
    const fetchData = async () => {
      try {
        const commentData = await getCommentsByFeedId(feedId);
        if (!active) return;
        setComments(commentData);

        const detail = await getFeedDetail(feedId, userId);
        if (active) setFeedDetail(detail);
      } catch (err) {
        if (active) {
          setLoadError(isAxiosError(err) && err.response?.status === 404
            ? "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uD53C\uB4DC\uC785\uB2C8\uB2E4."
            : "\uD53C\uB4DC\uB97C \uBD88\uB7EC\uC624\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4.");
        }
        console.error("데이터 불러오기 실패:", err);
      }
    };

    void fetchData();
    return () => { active = false; };
  }, [feedId, userId]);

  const handleSubmit = async () => {
    if (!userId || !feedDetail || loadError || comment.length < MIN_COMMENT_LENGTH) return;

    try {
      await postComment(feedId, comment, replyTargetId ?? undefined);
      const updated = await getCommentsByFeedId(feedId);
      setComments(updated);
      setComment("");
      setReplyTargetId(null);
      setReplyTargetUser(null);
    } catch (err) {
      console.error("댓글 작성 실패:", err);
    }
  };

  const handleLikeToggle = async (commentId: number, currentlyLiked: boolean) => {
    if (!userId || !feedDetail || loadError) return;
    try {
      if (currentlyLiked) {
        await unlikeComment(feedId, commentId);
        setComments((prev) =>
          updateCommentLike(prev, commentId, false)
        );
      } else {
        await likeComment(feedId, commentId);
        setComments((prev) =>
          updateCommentLike(prev, commentId, true)
        );
      }
    } catch (err) {
      console.error("댓글 좋아요 토글 실패:", err);
    }
  };

  const handleReplyToggle = (id: number) => {
    if (replyTargetId === id) {
      setReplyTargetId(null);
      setReplyTargetUser(null);
    } else {
      const target = comments.find((c) => c.id === id);
      if (!target) return;
      setReplyTargetId(id);
      setReplyTargetUser(target.userId);
    }
  };

  return {
    loadError,
    userError,
    retryUser,
    feedDetail,
    comment,
    comments,
    replyTargetId,
    replyTargetUser,
    setComment,
    handleSubmit,
    handleLikeToggle,
    handleReplyToggle,
  };
}
