import { useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import sampleCard from "../../assets/picture/sample_emotion_card.png";

const cards = [
  {
    title: "Peaceful",
    description:
      "오늘은 감각향 햇살 아래 조용한 시간을 보낸다. 바람 따라 산책하며 마음도 함께 가벼워졌다. …더보기",
    tags: ["행복", "기쁨", "평화"],
    image: sampleCard,
  },
  {
    title: "Energetic",
    description: "활기찬 하루의 시작. 새로운 도전을 향해 전진한다. …더보기",
    tags: ["열정", "활력", "자신감"],
    image: sampleCard,
  },
  {
    title: "Melancholy",
    description: "조용히 내면을 들여다보는 시간. 감정의 깊이에 잠긴다. …더보기",
    tags: ["슬픔", "고요함", "사색"],
    image: sampleCard,
  },
];

export default function RecommendedCardModal() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentCard = cards[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) setCurrentIndex(currentIndex + 1);
  };

  if (!isVisible) return null;

  return (
    <div className="flex justify-center items-center w-[25rem] h-[30rem] bg-gray-100">
      <div className="relative bg-white w-[25rem] h-[30rem] p-6 rounded-2xl shadow-lg flex flex-col items-center space-y-3">
        {/* X 버튼 */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        {/* 왼쪽 화살표 */}
        {currentIndex > 0 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <IoChevronBack size={24} />
          </button>
        )}

        {/* 오른쪽 화살표 */}
        {currentIndex < cards.length - 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
          >
            <IoChevronForward size={24} />
          </button>
        )}

        {/* 상단 제목 */}
        <p className="text-sm text-gray-600">비슷한 감정 카드 추천</p>

        {/* 카드 이미지 */}
        <img
        src={currentCard.image}
        alt={currentCard.title}
        className="w-[17rem] h-auto"
        />

        {/* 설명 */}
        <p className="text-xs text-center text-gray-600 leading-snug px-2">
          {currentCard.description}
        </p>

        {/* 해시태그 */}
        <div className="text-sm text-blue-500 space-x-2">
          {currentCard.tags.map((tag, idx) => (
            <span key={idx}># {tag}</span>
          ))}
        </div>

        {/* 인디케이터 */}
        <div className="flex space-x-1 mt-auto">
          {cards.map((_, idx) => (
            <span
              key={idx}
              className={`w-2 h-2 rounded-full ${
                idx === currentIndex ? "bg-gray-800" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
}
