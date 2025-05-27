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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div
        className="w-[370px] h-[600px] relative"
        onClick={() => setFlipped(!flipped)}
        style={{ perspective: '1500px' }}
      >
        <div
          className="relative w-full h-full transition-transform duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* 앞면 */}
          <div
            className={`absolute w-full h-full rounded-xl border shadow-xl px-6 py-8 flex flex-col justify-between bg-white`}
            style={{ backfaceVisibility: 'hidden' }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-400 z-10"
            >
              <X size={24} />
            </button>

            <div className="text-center text-black-500 text-lg font-semibold">{back.date}</div>

            <div className="relative w-full h-[320px]">
              <img
                src={front.image}
                alt="emotion"
                className="w-full h-full object-cover rounded-md border shadow-md"
              />
            </div>

            <div className="text-center">
              <p className="text-md text-gray-600 font-medium"># {back.hashtags.join(' # ')}</p>
            </div>
          </div>

          {/* 뒷면 */}
          <div
            className={`absolute w-full h-full rounded-xl border shadow-xl px-6 py-8 flex flex-col justify-between bg-white`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onClose) onClose();
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-400 z-10"
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
