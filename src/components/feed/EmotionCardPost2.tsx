import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import cardImage from "../../assets/picture/sample_emotion_card.png";

export default function EmotionCardPost2() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "user_user", text: "커피는 아메리카노", likes: 1, liked: false },
    { id: 2, user: "user_user", text: "커피는 아메리카노", likes: 1, liked: false },
    { id: 3, user: "user_user", text: "커피는 아메리카노", likes: 1, liked: false },
    { id: 4, user: "user_user", text: "커피는 아메리카노", likes: 1, liked: false },
  ]);
  const [replyTargetId, setReplyTargetId] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (comment.length >= 10) {
      const newComment = {
        id: Date.now(),
        user: "my_user",
        text: comment,
        likes: 0,
        liked: false,
      };
      setComments([...comments, newComment]);
      setComment("");
      setReplyTargetId(null);
    }
  };

  const handleLikeToggle = (id: number) => {
    setComments(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              liked: !c.liked,
              likes: c.liked ? c.likes - 1 : c.likes + 1,
            }
          : c
      )
    );
  };

  const handleReplyToggle = (id: number) => {
    setReplyTargetId(prev => (prev === id ? null : id));
  };

  const handleClose = () => {
    navigate("/friend/list/feed");
  };

  return (
    <div className="flex w-[60em] h-[40em] bg-white rounded-2xl shadow overflow-hidden relative">
      {/* 닫기 버튼 */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition"
      >
        <IoClose size={24} />
      </button>

      {/* 좌측 감정 카드 */}
      <div className="flex-1 bg-gray-50 flex justify-center items-center p-6">
        <img src={cardImage} alt="감정카드" className="w-full rounded-xl" />
      </div>

      {/* 우측 댓글 영역 */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto relative">
        {/* 작성자 정보 + 게시글 */}
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

        {/* 댓글 리스트 */}
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
                  <span className="text-gray-800 font-medium">{c.user}</span>
                  <span className="text-gray-600">{c.text}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-[18px] text-gray-500 mt-2">
                <button onClick={() => handleLikeToggle(c.id)}>
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

        {/* 댓글 입력창 고정 */}
        <div className="absolute bottom-4 left-0 right-0 px-6">
        {/* 전체 너비 border-top */}
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
