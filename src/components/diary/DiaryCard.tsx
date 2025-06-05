import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Trash2 } from 'lucide-react';
import EmotionCard from './EmotionCard';

type EmotionCardDataType = {
  color: string;
  emotion: string;
  image: string;
  date: string;
  hashtags: string[];
  chartData: { name: string; value: number }[];
};

type DiaryCardProps = {
  id: number;
  title: string;
  content: string;
  emotion: string;
  date: string;
  userUploadImage: string;
  image: string;
  color: string;
  emotionCard?: EmotionCardDataType;
};

export default function DiaryCard({
  id,
  title,
  content,
  emotion,
  date,
  userUploadImage,
  image,
  color,
  emotionCard,
}: DiaryCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden relative">
        <div className="absolute top-2 right-2" ref={menuRef}>
          <MoreVertical
            size={20}
            className="text-gray-400 cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full"
                onClick={() => {
                  setShowMenu(false);
                  alert('삭제 기능 여기서 구현하기');
                }}
              >
                <Trash2 size={16} />
                삭제
              </button>
            </div>
          )}
        </div>

        <div
          className="flex justify-between p-4 pt-8 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">· {date}</p>
            </div>
            <p
              className={`text-sm text-gray-400 mt-1 w-[70%] whitespace-pre-line transition-all duration-300 ${
                isExpanded ? '' : 'line-clamp-2'
              }`}
            >
              {content}
            </p>
          </div>
          <div className="flex-shrink-0 ml-auto mr-[5%]">
            <img src={userUploadImage} alt="diary" className="w-24 h-24 object-cover rounded-md" />
          </div>
        </div>

        <div className={`flex justify-between items-center text-white px-4 py-2 ${color}`}>
          <span className="text-sm font-semibold">#{emotion}</span>
          <button
            className="flex-shrink-0 ml-auto mr-[5%] text-sm font-semibold hover:underline"
            onClick={() => setShowModal(true)}
          >
            감정카드 보기
          </button>
        </div>
      </div>

      {showModal && emotionCard && (
        <EmotionCard
          front={{
            color: emotionCard.color,
            emotion: emotionCard.emotion,
            image: emotionCard.image,
          }}
          back={{
            color: emotionCard.color,
            date: emotionCard.date,
            hashtags: emotionCard.hashtags,
            chartData: emotionCard.chartData,
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
