import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import cardImage from "../../assets/picture/sample_emotion_card.png";

import {
  postComment,
  likeComment,
  unlikeComment,
  fetchCommentList,
} from "@/services/commentService";

interface CommentType {
  id: number;
  userId: string;
  content: string;
  likes: number;
  liked: boolean;
}

interface EmotionCardPost2Props {
  feedId: number;
}

export default function EmotionCardPost2({ feedId }: EmotionCardPost2Props) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<CommentType[]>([]);
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const navigate = useNavigate();

  // ✅ 최초 렌더링 시 댓글 목록 불러오기
  useEffect(() => {
    const loadComments = async () => {
      try {
        const token = localStorage.getItem("accessToken") || "";
        const data = await fetchCommentList(feedId, token);
        const loaded = data.commentList.map((c: any) => ({
          id: c.id,
          userId: c.userId,
          content: c.content,
          likes: 0, // 백엔드에서 좋아요 수 포함 시 수정
          liked: false,
        }));
        setComments(loaded);
      } catch (err) {
        console.error("❌ 댓글 목록 로드 실패:", err);
      }
    };
    loadComments();
  }, [feedId]);

  const handleSubmit = async () => {
    if (comment.length < 10) return;

    setComments((prev) => [
      ...prev,
      {
        id: Date.now(),
        userId: "my_user",
        content: comment,
        likes: 0,
        liked: false,
      },
    ]);

    setComment("");
    setReplyTargetId(null);

    try {
      const token = localStorage.getItem("accessToken") || "";
      await postComment(
        feedId,
        {
          content: comment,
          parentCommentId: replyTargetId ?? null,
        },
        token
      );
    } catch (err) {
      console.error("❌ 댓글 작성 실패 (UI는 유지됨):", err);
    }
  };

  const handleLikeToggle = async (id: number, currentlyLiked: boolean) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );

    try {
      const token = localStorage.getItem("accessToken") || "";
      if (!token) return;

      if (!currentlyLiked) {
        await likeComment(feedId, id, token);
      } else {
        await unlikeComment(feedId, id, token);
      }
    } catch (err) {
      console.error("❌ 좋아요 처리 실패 (UI는 유지됨):", err);
    }
  };

  const handleReplyToggle = (id: number) => {
    setReplyTargetId((prev) => (prev === id ? null : id));
  };

  const handleClose = () => {
    navigate("/friend/list/feed");
  };

  return (
    <div className="flex w-[60em] h-[40em] bg-white rounded-2xl shadow overflow-hidden relative">
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition"
      >
        <IoClose size={24} />
      </button>

      <div className="flex-1 bg-gray-50 flex justify-center items-center p-6">
        <img src={cardImage} alt="감정카드" className="w-full rounded-xl" />
      </div>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto relative">
        <div className="flex items-start gap-3 mb-6">
          <FaUserCircle size={40} className="text-gray-500 mt-1" />
          <div className="flex flex-col text-[18px]">
            <span className="font-semibold text-gray-800">Life_is_good</span>
            <span className="text-gray-700 leading-snug">
              눈누난나 <br />
              커피 한 잔의 여유 <br />
              커피 오다 행복
            </span>
          </div>
        </div>

        <div className="space-y-2">
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
                  <span className="text-gray-800 font-medium">
                    {c.userId}
                  </span>
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
                <span>{c.likes}개</span>
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

        <div className="absolute bottom-4 left-0 right-0 px-6">
          <div className="border-t border-gray-200 -mx-6 mb-3" />
          <div className="flex justify-between items-center">
            <input
              type="text"
              placeholder="댓글 작성..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 px-4 py-[10px] text-[16px] placeholder-gray-400 focus:outline-none border-none"
            />
            <button
              onClick={handleSubmit}
              disabled={comment.length < 10}
              className={`ml-3 px-4 py-1 text-[16px] rounded-full transition ${
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
