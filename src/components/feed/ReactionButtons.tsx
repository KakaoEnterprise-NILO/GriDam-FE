// components/feed/ReactionButtons.tsx
import { useState } from "react";
import { toggleReaction } from "@/services/reactionService";

interface ReactionButtonsProps {
  feedId: number;
}

const emojiToReaction: Record<string, string> = {
  "😄": "좋아요",
  "🥰": "공감해요",
  "😂": "슬퍼요",
  "😡": "힘내요",
};

const emojiList = Object.keys(emojiToReaction);

export default function ReactionButtons({ feedId }: ReactionButtonsProps) {
  const [selectedEmoji, setSelectedEmoji] = useState<string | null>(null);

  const handleEmojiClick = async (emoji: string) => {
    const token = localStorage.getItem("accessToken") || "";
    const reactionType = emojiToReaction[emoji];
    if (!reactionType || !token) return;

    try {
      await toggleReaction(feedId, reactionType, token);
      setSelectedEmoji(emoji); // UI 반영
    } catch (err) {
      console.error("❌ 피드 반응 처리 실패:", err);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 rounded-full px-3 h-[2.25rem] space-x-2">
      {emojiList.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleEmojiClick(emoji)}
          className={`w-6 h-6 flex items-center justify-center text-xl transition hover:scale-110 ${
            selectedEmoji === emoji ? "scale-110" : ""
          }`}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
}
