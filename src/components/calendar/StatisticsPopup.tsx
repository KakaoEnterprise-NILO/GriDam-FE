"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { useState } from "react"
import { X, BarChart3, Calendar } from "lucide-react"

type EmotionData = {
  name: string
  value: number
  color: string
  emoji: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: { payload?: EmotionData }[]
}

interface StatisticsPopupProps {
  open: boolean
  onClose: () => void
  data: EmotionData[]
  year: number
  month: number
}

const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]

// 감정에 따른 색상 매핑 (캘린더와 일관성 유지)
const getEmotionColor = (emotion: string): string => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "#FBBF24" // 노란색
    case "JOY":
    case "기쁨":
      return "#34D399" // 에메랄드색
    case "SAD":
    case "슬픔":
      return "#60A5FA" // 파란색
    case "ANXIOUS":
    case "불안":
      return "#A78BFA" // 보라색
    case "ANGRY":
    case "화남":
      return "#F87171" // 빨간색
    case "SURPRISE":
    case "놀람":
      return "#FB923C" // 주황색
    case "DISGUST":
    case "역겨움":
      return "#9CA3AF" // 회색
    case "FEAR":
    case "두려움":
      return "#6B7280" // 어두운 회색
    case "NONE":
    case "없음":
      return "#D1D5DB" // 밝은 회색
    default:
      return "#D1D5DB"
  }
}

export default function StatisticsPopup({ open, onClose, data, year, month }: StatisticsPopupProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  if (!open) return null

  const updatedData = data.map((item) => ({
    ...item,
    color: getEmotionColor(item.name),
  }))

  const totalEntries = updatedData.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
    const data = payload?.[0]?.payload
    if (active && data) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100">
          <p className="text-lg font-bold flex items-center gap-2">
            <span>{data.emoji}</span>
            <span>{data.name}</span>
          </p>
          <p className="text-gray-600">
            {data.value}개 ({((data.value / totalEntries) * 100).toFixed(1)}%)
          </p>
        </div>
      )
    }
    return null
  }

  const handleEmotionClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-blue-50 via-white to-blue-50 p-6 border-b border-gray-100 relative">
          <div className="flex items-center justify-center">
            <Calendar className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">
              {year}년 {monthNames[month - 1]} 감정 통계
            </h2>
          </div>
          <button
            className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 md:p-8">
          {updatedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <BarChart3 className="w-16 h-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg font-medium">이번 달 기록된 감정이 없습니다</p>
              <p className="text-gray-400 mt-2">일기를 작성하면 감정 통계가 표시됩니다</p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-full md:w-1/2">
                <div className="h-[300px] relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={updatedData}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={4}
                        dataKey="value"
                        animationDuration={1000}
                        animationBegin={0}
                        animationEasing="ease-out"
                        onMouseEnter={(_, index) => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        {updatedData.map((entry, index) => (
                          <Cell
                            key={entry.name}
                            fill={entry.color}
                            stroke={activeIndex === index ? "#fff" : "none"}
                            strokeWidth={activeIndex === index ? 2 : 0}
                            className="transition-all duration-200"
                            style={{
                              filter: activeIndex === index ? "drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))" : "none",
                              transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                              opacity: activeIndex === null || activeIndex === index ? 1 : 0.7,
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <p className="text-3xl font-bold text-gray-800">{totalEntries}</p>
                    <p className="text-gray-500 text-sm">총 기록</p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2">
                <h3 className="text-lg font-semibold mb-4 text-gray-700">감정 분포</h3>
                <div className="space-y-3">
                  {updatedData.map((item, idx) => (
                    <div
                      key={item.name}
                      className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        activeIndex === idx ? "bg-gray-100" : "hover:bg-gray-50"
                      }`}
                      onClick={() => handleEmotionClick(idx)}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-4 text-xl"
                        style={{ backgroundColor: item.color + "33" }} // 배경색 투명도 추가
                      >
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-gray-800">{item.name}</span>
                          <span className="text-gray-500">{item.value}개</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="h-2 rounded-full transition-all duration-500 ease-out"
                            style={{
                              width: `${(item.value / totalEntries) * 100}%`,
                              backgroundColor: item.color,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {totalEntries > 0
              ? `이번 달 가장 많은 감정: ${updatedData.sort((a, b) => b.value - a.value)[0]?.emoji} ${
                  updatedData.sort((a, b) => b.value - a.value)[0]?.name
                }`
              : "감정 기록을 시작해보세요"}
          </p>
        </div>
      </div>
    </div>
  )
}
