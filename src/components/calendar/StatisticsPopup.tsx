import { PieChart, Pie, Cell, Tooltip } from 'recharts'
import React from 'react'

type EmotionData = {
  name: string
  value: number
  color: string
  emoji: string
}

interface StatisticsPopupProps {
  open: boolean
  onClose: () => void
  data: EmotionData[]
  year: number
  month: number
}

export default function StatisticsPopup({ open, onClose, data, year, month }: StatisticsPopupProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-2xl min-h-[500px] relative shadow-xl flex flex-col justify-start items-center">
        {/* 닫기 버튼 */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold"
          onClick={onClose}
        >
          ×
        </button>

        {/* 제목 (위쪽에 배치) */}
        <h2 className="text-center text-lg font-bold mb-4">{year}년 {month}월</h2>

        {/* 본문 (중앙 정렬) */}
        <div className="flex-1 flex flex-col md:flex-row justify-center items-center gap-6">
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          {/* 오른쪽 감정 설명 */}
          <div className="text-sm">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span>{item.emoji} {item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
