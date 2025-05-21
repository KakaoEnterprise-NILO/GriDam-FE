import { useState } from 'react'
import { X, WalletCards } from 'lucide-react'
import { PieChart, Pie, Cell } from 'recharts'
import EmotionCard from './EmotionCard_Calendar'  // 감정카드 컴포넌트 import
import { useDiaryStore } from '@/store/diaryStore'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

interface DiaryPopupProps {
  open: boolean
  onClose: () => void
  diaryId: number
}

export default function DiaryCardPopup({ open, onClose, diaryId }: DiaryPopupProps) {
  const [showCard, setShowCard] = useState(false)
  const diary = useDiaryStore((state) => state.diaries.find((d) => d.id === diaryId))

  if (!open || !diary) return null

  const { date, title, content, userUploadImage, hashtags, chartData, color, emotion, image } = diary

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative w-[400px] h-[700px] bg-[#fffef9] rounded-3xl shadow-2xl border border-[#e0d7c6] flex flex-col overflow-hidden">
        {/* 닫기 */}
        <button onClick={onClose} className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 z-10">
          <X className="w-5 h-5" />
        </button>

        {/* 상단 */}
        <div className="text-center p-5 border-b border-[#e9e4db]">
          <p className="text-sm text-gray-500 mb-1">{date}</p>
          <p className="text-2xl font-bold text-[#5b3d1d] tracking-wide">
            {showCard ? '감정 카드' : title}
          </p>
        </div>

        {/* 내용 */}
        <div className="flex-1 px-6 py-4 overflow-y-auto space-y-4 flex justify-center items-center">
  {!showCard ? (
    <div className="w-full">
      {userUploadImage && (
        <div className="w-full h-48 rounded-xl overflow-hidden shadow-md mb-4">
          <img src={userUploadImage} alt="Diary" className="w-full h-full object-cover" />
        </div>
      )}
      <p className="whitespace-pre-wrap text-gray-800 text-sm leading-relaxed">{content}</p>
      {hashtags.length > 0 && (
        <div className="pt-4 text-sm text-gray-600 border-t border-[#e9e4db]">
          {hashtags.map((tag, idx) => (
            <span key={idx} className="mr-2">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </div>
  ) : (
    <EmotionCard
      front={{
        color,
        emotion,
        image,
      }}
      back={{
        color,
        date,
        hashtags,
        chartData,
      }}
      onClose={() => setShowCard(false)} // 카드 닫기 버튼 누르면 일기 화면으로 복귀
    />
  )}
</div>

        {/* 토글 버튼 */}
        <div className="p-3 border-t border-[#e9e4db] flex justify-center bg-white">
          <button
            onClick={() => setShowCard(!showCard)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300
              ${showCard ? 'bg-white text-blue-500 border border-blue-400' : 'bg-blue-500 text-white'}
            `}
          >
            {showCard ? '일기보기' : '카드보기'}
            <WalletCards className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
