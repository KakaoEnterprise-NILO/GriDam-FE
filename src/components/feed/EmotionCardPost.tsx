import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoShareOutline, IoBookmarkOutline } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import cardImage from "../../assets/picture/sample_emotion_card.png";

export default function EmotionCardPost() {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate(); // 페이지 이동용

  const emojiList = ["😄", "🥰", "😂", "😡"];

  const handleSubmit = () => {
    console.log("댓글:", comment);
    setComment("");
    setIsFocused(false);
  };

  const handleCancel = () => {
    setComment("");
    setIsFocused(false);
  };

  const handleViewAllComments = () => {
    navigate("/friend/list/feed/entire/1"); // 실제 게시물 ID로 교체
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-[40em] space-y-4">
      {/* 사용자 정보 */}
      <div className="flex items-center space-x-2 px-4">
        <FaUserCircle size={34} className="text-gray-500" />
        <span className="text-sm font-semibold text-gray-700">Life_is_good</span>
      </div>

      {/* 감정 카드 이미지 */}
      <div className="px-4">
        <img src={cardImage} alt="감정카드" className="w-full rounded-lg" />
      </div>

      {/* 리액션 & 버튼 그룹 */}
      <div className="flex justify-end items-center space-x-3 px-4 mb-4">
        {/* 이모지 그룹 */}
        <div className="flex items-center bg-gray-100 rounded-full px-3 h-[2.25rem] space-x-2">
          {emojiList.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setSelectedEmoji(emoji)}
              className={`w-6 h-6 flex items-center justify-center text-xl transition hover:scale-110 ${
                selectedEmoji === emoji ? "scale-110" : ""
              }`}
            >
              {emoji}
            </button>
          ))}
        </div>

        {/* 공유/저장 버튼 */}
        <div className="flex space-x-2">
          <button className="flex items-center justify-center h-[2.25rem] space-x-1 bg-gray-100 text-sm text-gray-700 px-3 rounded-full hover:bg-gray-200 transition">
            <IoShareOutline size={16} />
            <span>공유하기</span>
          </button>
          <button className="flex items-center justify-center h-[2.25rem] space-x-1 bg-gray-100 text-sm text-gray-700 px-3 rounded-full hover:bg-gray-200 transition">
            <IoBookmarkOutline size={16} />
            <span>저장하기</span>
          </button>
        </div>
      </div>

      {/* 본문 */}
      <p className="text-sm text-gray-700 leading-relaxed px-6 mt-6 mb-4">
        오늘은 잔잔한 햇살 아래 조용한 시간을 보냈다. 바람 따라 산책하며 마음도 한결 가벼워졌다.
        평화롭게 하루를 정리하고 느낀다.
      </p>

      {/* 해시태그 */}
      <div className="text-sm px-6 space-x-2 mt-10 mb-2">
        <span className="text-blue-600 font-medium">#기쁨</span>
        <span className="text-blue-600 font-medium">#평화</span>
        <span className="text-blue-600 font-medium">#나눔</span>
        <span className="text-blue-600 font-medium">#행복</span>
      </div>

      {/* 댓글 10개 모두보기 */}
      <div className="px-4">
        <button
          onClick={handleViewAllComments}
          className="text-sm text-gray-400 hover:underline"
        >
          댓글 10개 모두보기
        </button>
      </div>

      {/* 댓글 입력 영역 */}
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
              className={`text-sm px-4 py-1 rounded-full transition
                ${comment.length >= 10
                  ? "bg-blue-500 text-white hover:bg-blue-600"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"}
              `}
            >
              완료
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
