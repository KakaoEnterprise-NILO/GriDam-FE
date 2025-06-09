import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import {
  postComment,
  getCommentsByFeedId,
  likeComment,
  unlikeComment,
} from "@/services/commentService";
import { getFeedDetail } from "@/services/feedService"; // ✅ 피드 상세 조회 API 추가

interface CommentType {
  id: number;
  userId: string;
  content: string;
  likes: number;
  liked: boolean;
}

interface FeedDetail {
  id: number;
  content: string;
  createdAt: string;
  emotionCardId: number;
}

export default function EmotionCardPost2() {
  const { id } = useParams<{ id: string }>();
  const feedId = parseInt(id ?? "0");
  const navigate = useNavigate();

  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const [replyTargetUser, setReplyTargetUser] = useState<string | null>(null);

  const [feedDetail, setFeedDetail] = useState<FeedDetail | null>(null); // ✅ 피드 상세 상태

  useEffect(() => {
  const fetchData = async () => {
    try {
      // 댓글 조회
      const commentData = await getCommentsByFeedId(feedId);
      setComments(commentData);

      // 피드 상세 조회
      const userId = localStorage.getItem("userId") || "";
      const detail = await getFeedDetail(feedId, userId); // ✅ token 제거
      setFeedDetail(detail);
    } catch (err) {
      console.error("❌ 데이터 불러오기 실패:", err);
    }
  };

  fetchData();
}, [feedId]);

  const handleSubmit = async () => {
    if (comment.length < 10) return;

    try {
      await postComment(feedId, comment, replyTargetId ?? undefined);
      const updated = await getCommentsByFeedId(feedId);
      setComments(updated);
      setComment("");
      setReplyTargetId(null);
      setReplyTargetUser(null);
    } catch (err) {
      console.error("❌ 댓글 작성 실패:", err);
    }
  };

  const handleLikeToggle = async (commentId: number, currentlyLiked: boolean) => {
    try {
      if (currentlyLiked) {
        await unlikeComment(feedId, commentId);
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, liked: false, likes: c.likes - 1 } : c
          )
        );
      } else {
        await likeComment(feedId, commentId);
        setComments((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, liked: true, likes: c.likes + 1 } : c
          )
        );
      }
    } catch (err) {
      console.error("❌ 댓글 좋아요 토글 실패:", err);
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

  const handleClose = () => {
    navigate("/friends/feed");
  };

  if (isNaN(feedId)) {
    return (
      <div className="w-full h-full flex items-center justify-center text-red-500 text-lg">
        ❌ 잘못된 피드 ID입니다.
      </div>
    );
  }

  return (
    <div className="flex w-[60em] h-[40em] bg-white rounded-2xl shadow overflow-hidden relative">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition"
      >
        <IoClose size={24} />
      </button>

      {/* 카드 이미지 영역 */}
      <div className="flex-1 bg-gray-50 flex justify-center items-center p-6">
        <img
          src={"/assets/picture/sample_emotion_card.png"} // 필요시 feedDetail.emotionCardId 활용 가능
          alt="감정카드"
          className="w-full rounded-xl"
        />
      </div>

      {/* 댓글 영역 */}
      <div className="flex-1 relative flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 pb-28 space-y-4">
          {/* 카드 작성자 + 내용 */}
          <div className="flex items-start gap-3 mb-6">
            <FaUserCircle size={40} className="text-gray-500 mt-1" />
            <div className="flex flex-col text-[18px]">
              <span className="font-semibold text-gray-800">Life_is_good</span>
              <span className="text-gray-700 leading-snug whitespace-pre-wrap">
                {feedDetail?.content ?? "로딩 중..."}
              </span>
            </div>
          </div>

          {/* 댓글 리스트 */}
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
                <button onClick={() => handleLikeToggle(c.id, c.liked)}>
                  {c.liked ? (
                    <AiFillHeart className="text-red-500" />
                  ) : (
                    <AiOutlineHeart className="text-red-500" />
                  )}
                </button>
                <button
                  onClick={() => handleReplyToggle(c.id)}
                  className="hover:underline"
                >
                  답글
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* 댓글 입력창 */}
        <div className="absolute bottom-0 left-0 right-0 px-6 py-3 bg-white border-t border-gray-200">
          {replyTargetUser && (
            <div className="text-sm text-gray-500 mb-1">
              @{replyTargetUser} 님에게 답
            </div>
          )}
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="댓글 작성..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-4 py-2 text-[16px] placeholder-gray-400 focus:outline-none border-none"
            />
            <button
              onClick={handleSubmit}
              disabled={comment.length < 10}
              className={`ml-3 px-4 py-2 text-[16px] rounded-full transition ${
                comment.length >= 10
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
