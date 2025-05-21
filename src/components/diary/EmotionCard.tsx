import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { PieChart, Pie, Cell } from 'recharts';
import { X } from 'lucide-react';

type EmotionCardProps = {
  front: {
    color: string;
    emotion: string;
    image: string;
  };
  back: {
    color: string;
    date: string;
    hashtags: string[];
    chartData: { name: string; value: number }[];
  };
  onClose?: () => void;
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function EmotionCard({ front, back, onClose }: EmotionCardProps) {
  const [flipped, setFlipped] = useState(false);

  // 모달 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      {/* 카드 컨테이너 */}
      <div
        className="w-[370px] h-[600px] relative"
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: '1500px' }}
      >
        {/* 카드 앞면/뒷면 */}
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* 앞면 */}
          <div
            className={`absolute w-full h-full rounded-xl border shadow-xl px-6 py-8 flex flex-col justify-between ${front.color}`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            {/* X 버튼 - 앞면 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-[0.3em] text-[#5b3d1d]">
                {front.emotion.toUpperCase()}
              </h2>
            </div>

            <div className="relative w-full h-[320px]">
              <img
                src={front.image}
                alt="emotion"
                className="w-full h-full object-cover rounded-md border shadow-md"
              />
              <p className="absolute bottom-3 left-3 right-3 text-black text-sm font-semibold drop-shadow-md text-center">
                {/* 내가 유치하게 울고 또 진지했으면, 감당할 순 있었을까 */}
              </p>
            </div>

            <div className="text-center">
              <p className="text-2xl italic text-[#5b3d1d] font-serif">{front.emotion}</p>
            </div>
          </div>

          {/* 뒷면 */}
          <div
            className={`absolute w-full h-full rounded-xl border shadow-xl px-6 py-8 flex flex-col justify-between ${back.color}`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {/* X 버튼 - 뒷면 */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="absolute top-2 right-2 text-white hover:text-gray-300 z-10"
            >
              <X size={24} />
            </button>
            <div className="text-center text-lg text-gray-700 font-semibold">{back.date}</div>

            <div className="flex justify-center">
              <div className="w-full h-[300px]">
                <PieChart width={300} height={300}>
                  <Pie
                    data={back.chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {back.chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </div>
            </div>

            <div className="text-center space-y-2">
              <p className="text-md text-gray-600 font-medium"># {back.hashtags.join(' # ')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}
