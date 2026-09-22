import { useNavigate, useParams } from "react-router-dom";
import PostDetailActions from "@/components/feed/post-detail/PostDetailActions";
import PostDetailImage from "@/components/feed/post-detail/PostDetailImage";
import PostDetailContent from "@/components/feed/post-detail/PostDetailContent";
import PostDetailComments from "@/components/feed/post-detail/PostDetailComments";
import PostDetailCommentComposer from "@/components/feed/post-detail/PostDetailCommentComposer";
import { useEmotionCardPostDetail } from "@/components/feed/post-detail/useEmotionCardPostDetail";

export default function EmotionCardPostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const feedId = id && /^[1-9]\d*$/.test(id) ? Number(id) : NaN;
  const navigate = useNavigate();
  const {
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
  } = useEmotionCardPostDetail(feedId);

  if (!Number.isSafeInteger(feedId)) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500 text-lg">
        잘못된 피드 ID입니다.
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-2rem)] max-h-[40em] w-full max-w-[60em] min-w-0 flex-col overflow-hidden rounded-2xl bg-white shadow relative md:flex-row">
      <PostDetailActions onClose={() => navigate("/friends/feed")} />
      <PostDetailImage />
      <div className="flex min-h-0 min-w-0 flex-1 flex-col relative">
        <div className="min-h-0 flex-1 overflow-y-auto p-3 pb-24 sm:p-4 md:p-6 md:pb-28 space-y-4">
          {loadError ? (
            <p role="alert" className="text-red-500">{loadError}</p>
          ) : userError ? (
            <div role="alert">
              <p>{userError}</p>
              <button type="button" onClick={() => void retryUser()} className="text-blue-600 hover:underline">
                {"\uB2E4\uC2DC \uC2DC\uB3C4"}
              </button>
            </div>
          ) : <PostDetailContent content={feedDetail?.content} />}
          <PostDetailComments
            comments={comments}
            replyTargetId={replyTargetId}
            onLikeToggle={handleLikeToggle}
            onReplyToggle={handleReplyToggle}
          />
        </div>
        <PostDetailCommentComposer
          comment={comment}
          replyTargetUser={replyTargetUser}
          onCommentChange={setComment}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
