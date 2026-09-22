import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import type { FeedComment } from "@/types/feed";

interface PostDetailCommentsProps {
  comments: FeedComment[];
  replyTargetId: number | null;
  onLikeToggle: (commentId: number, currentlyLiked: boolean) => void;
  onReplyToggle: (commentId: number) => void;
}

export default function PostDetailComments({
  comments,
  replyTargetId,
  onLikeToggle,
  onReplyToggle,
}: PostDetailCommentsProps) {
  return (
    <>
      {comments.map((c) => (
        <div
          key={c.id}
          className={`flex items-start justify-between p-2 rounded-xl ${
            replyTargetId === c.id ? "bg-red-100" : ""
          }`}
        >
          <div className="flex items-start gap-3">
            <FaUserCircle size={40} className="text-gray-400 mt-1" />
            <div className="flex flex-col text-[18px]">
              <span className="text-gray-800 font-medium">{c.userId}</span>
              <span className="text-gray-600">{c.content}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[18px] text-gray-500 mt-2">
            <button type="button" onClick={() => onLikeToggle(c.id, c.liked)}>
              {c.liked ? (
                <AiFillHeart className="text-red-500" />
              ) : (
                <AiOutlineHeart className="text-red-500" />
              )}
            </button>
            <button type="button"
              onClick={() => onReplyToggle(c.id)}
              className="hover:underline"
            >
              답글
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
