import { useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import r1 from "../../assets/picture/r1.png";
import r2 from "../../assets/picture/r2.png";
import r3 from "../../assets/picture/r3.png";


const cards = [
  {
    title: "Frustrated",
    description:
      "계속되는 오해와 반복되는 실망. 감정이 쌓여 폭발 직전이다. 오늘은 내 감정을 솔직하게 표현해보고 싶다. …더보기",
    tags: ["분노", "답답함", "억울함"],
    image: r1,
  },
  {
    title: "Overwhelmed",
    description:
      "끝없이 쏟아지는 일들과 기대 속에 지친 하루. 감정의 무게가 어깨를 짓누른다. 잠시 멈추고 숨을 고른다. …더보기",
    tags: ["스트레스", "지침", "감정과잉"],
    image: r2,
  },
  {
    title: "Resentful",
    description:
      "이해받지 못한 마음, 무시당한 느낌이 깊은 불쾌감으로 번진다. 나를 위한 거리를 둬야 할 때. …더보기",
    tags: ["억울함", "불쾌함", "거리두기"],
    image: r3,
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
