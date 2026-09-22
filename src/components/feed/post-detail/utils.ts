import type { FeedComment } from "@/types/feed";

export function updateCommentLike(
  comments: FeedComment[],
  commentId: number,
  liked: boolean,
): FeedComment[] {
  return comments.map((comment) =>
    comment.id === commentId
      ? { ...comment, liked, likes: comment.likes + (liked ? 1 : -1) }
      : comment,
  );
}
