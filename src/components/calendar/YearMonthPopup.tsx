// components/YearMonthPopup.tsx
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Props {
  selectedYear: number
  onSelect: (year: number, month: number) => void
  onClose: () => void
}

const backgroundColors = [
  'bg-lime-300', 'bg-sky-200', 'bg-rose-200', 'bg-rose-100',
  'bg-rose-300', 'bg-blue-400', 'bg-rose-100', 'bg-sky-200',
  'bg-lime-300', 'bg-rose-300', 'bg-orange-400', 'bg-blue-400',
]

const MonthEmoji = ({ index }: { index: number }) => {
  const emojis = ['🌼', '', '🌟', '', '😊', '', '', '', '', '', '', '🌸']
  return emojis[index] ? (
    <div className="absolute top-1 right-1 text-lg">{emojis[index]}</div>
  ) : null
}

export default function YearMonthPopup({ selectedYear, onSelect, onClose }: Props) {
  const [year, setYear] = useState(selectedYear)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[360px] shadow-xl relative">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setYear(year - 1)}>
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <h2 className="text-xl font-bold">{year}년</h2>
          <button onClick={() => setYear(year + 1)}>
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* 월 그리드 */}
        <div className="grid grid-cols-3 gap-4">
          {Array.from({ length: 12 }, (_, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(year, idx + 1)}
              className={`relative rounded-lg h-20 flex items-center justify-center text-lg font-semibold text-black ${backgroundColors[idx]} hover:scale-105 transition`}
            >
              {idx + 1}월
              <MonthEmoji index={idx} />
            </button>
          ))}
        </div>

        {/* 닫기 버튼 */}
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
