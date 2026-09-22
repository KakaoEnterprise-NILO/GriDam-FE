import { MIN_COMMENT_LENGTH } from "./constants";

interface PostDetailCommentComposerProps {
  comment: string;
  replyTargetUser: string | null;
  onCommentChange: (value: string) => void;
  onSubmit: () => void;
}

export default function PostDetailCommentComposer({
  comment,
  replyTargetUser,
  onCommentChange,
  onSubmit,
}: PostDetailCommentComposerProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-white border-t border-gray-200">
      {replyTargetUser && (
        <div className="text-sm text-gray-500 mb-1">
          @{replyTargetUser} 님에게 답
        </div>
      )}
      <div className="flex justify-between items-center">
        <label htmlFor="post-detail-comment" className="sr-only">댓글 작성</label>
        <input id="post-detail-comment"
          type="text"
          placeholder="댓글 작성..."
          value={comment}
          onChange={(e) => onCommentChange(e.target.value)}
          className="flex-1 px-4 py-2 text-[16px] placeholder-gray-400 focus:outline-none border-none"
        />
        <button type="button"
          onClick={onSubmit}
          disabled={comment.length < MIN_COMMENT_LENGTH}
          className={`ml-3 px-4 py-2 text-[16px] rounded-full transition ${
            comment.length >= MIN_COMMENT_LENGTH
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          완료
        </button>
      </div>
    </div>
  );
}
