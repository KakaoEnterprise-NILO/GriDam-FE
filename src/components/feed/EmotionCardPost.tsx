import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoShareOutline, IoBookmarkOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import cardImage from "../../assets/picture/default_img.jpg";
// import { toggleReaction } from "@/services/reactionService";
import { postComment } from "@/services/commentService";
import { deleteFeed } from "@/services/feedService";

import ReactionButtons from "./ReactionButtons";
import ShareModal from "./SareModal";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

interface EmotionCardPostProps {
  feedId: number;
  content: string;
  userId: string;
  createdAt: string;
  emotionCard: {
    cardImageUrl?: string;
    hashtags?: string[];
  } | null;
}

export default function EmotionCardPost({
  feedId,
  content,
  userId,
  // createdAt,
  emotionCard,
}: EmotionCardPostProps) {
  // const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const navigate = useNavigate();

  // const emojiToReaction: Record<string, string> = {
  //   "😄": "좋아요",
  //   "🥰": "공감해요",
  //   "😂": "슬퍼요",
  //   "😡": "힘내요",
  // };

  const handleSubmit = async () => {
    if (comment.length < 10) return;
    try {
      const result = await postComment(feedId, comment);
      console.log("✅ 댓글 등록 완료:", result);
      setComment("");
      setIsFocused(false);
    } catch (err) {
      console.error("❌ 댓글 등록 실패:", err);
    }
  };

  const handleCancel = () => {
    setComment("");
    setIsFocused(false);
  };

  const handleViewAllComments = () => {
    navigate(`/friend/list/feed/entire/${feedId}`);
  };

  // const handleEmojiClick = async (emoji: string) => {
  //   const token = localStorage.getItem("accessToken") || "";
  //   const reactionType = emojiToReaction[emoji];
  //   if (!reactionType || !token) return;

  //   try {
  //     await toggleReaction(feedId, reactionType, token);
  //     setSelectedEmoji(emoji);
  //   } catch (err) {
  //     console.error("❌ 피드 반응 처리 실패:", err);
  //   }
  // };

  const handleDeleteFeed = async () => {
    try {
      await deleteFeed(feedId); // ✅ token 없이 호출
      alert("피드가 성공적으로 삭제되었습니다.");
      window.location.reload();
    } catch (err) {
      console.error("❌ 피드 삭제 실패:", err);
      alert("피드 삭제에 실패했습니다.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-[40em] space-y-4 relative">
      <div className="absolute top-4 right-4">
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="text-gray-600 hover:text-black"
        >
          <BsThreeDotsVertical size={20} />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow-md z-20">
            <button
              onClick={() => {
                setMenuOpen(false);
                console.log("✏️ 수정 클릭됨");
              }}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
            >
              수정
            </button>
            <button
              onClick={() => {
                setMenuOpen(false);
                setShowDeleteConfirm(true);
              }}
              className="w-full px-4 py-2 text-sm hover:bg-gray-100 text-left"
            >
              삭제
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2 px-4">
        <FaUserCircle size={34} className="text-gray-500" />
        <span className="text-sm font-semibold text-gray-700">
          {userId || "user12"}
        </span>
      </div>

      <div className="px-4">
        <img
          src={emotionCard?.cardImageUrl || cardImage}
          alt="감정카드"
          className="w-full rounded-lg"
        />
      </div>

      <div className="flex justify-end items-center space-x-3 px-4 mb-4">
        <ReactionButtons feedId={feedId} />
        <div className="flex space-x-2">
          <button
            className="flex items-center justify-center h-[2.25rem] space-x-1 bg-gray-100 text-sm text-gray-700 px-3 rounded-full hover:bg-gray-200 transition"
            onClick={() => setShowShare(true)}
          >
            <IoShareOutline size={16} />
            <span>공유하기</span>
          </button>

          <button
            className="flex items-center justify-center h-[2.25rem] space-x-1 bg-gray-100 text-sm text-gray-700 px-3 rounded-full hover:bg-gray-200 transition"
            onClick={() => console.log("🔖 저장하기 클릭됨")}
          >
            <IoBookmarkOutline size={16} />
            <span>저장하기</span>
          </button>
        </div>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed px-6 mt-6 mb-4">
        {content}
      </p>

      <div className="text-sm px-6 space-x-2 mt-10 mb-2">
        {emotionCard?.hashtags?.map((tag, idx) => (
          <span key={idx} className="text-blue-600 font-medium">
            #{tag}
          </span>
        )) || (
          <>
            <span className="text-blue-600 font-medium">#긍정</span>
            <span className="text-blue-600 font-medium">#평화</span>
          </>
        )}
      </div>

      <div className="px-4">
        <button
          onClick={handleViewAllComments}
          className="text-sm text-gray-400 hover:underline"
        >
          댓글 10개 모두보기
        </button>
      </div>

      <div className="px-4">
        <input
          type="text"
          placeholder="댓글 추가..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="w-full mt-2 text-sm placeholder-gray-400 border-0 border-b border-gray-300 focus:outline-none focus:ring-0 focus:border-b-gray-400"
        />

        {isFocused && (
          <div className="flex justify-end space-x-4 mt-3">
            <button
              onClick={handleCancel}
              className="text-sm text-gray-700 hover:underline"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={comment.length < 10}
              className={`text-sm px-4 py-1 rounded-full transition ${
                comment.length >= 10
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              완료
            </button>
          </div>
        )}
      </div>

      {showShare && (
        <ShareModal
          onClose={() => setShowShare(false)}
          shareUrl={`https://gridam.store/friend/list/feed/entire/${feedId}`}
        />
      )}

      {showDeleteConfirm && (
        <DeleteConfirmModal
          onCancel={() => setShowDeleteConfirm(false)}
          onConfirm={handleDeleteFeed}
        />
      )}
    </div>
  );
}