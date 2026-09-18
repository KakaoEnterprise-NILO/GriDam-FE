import { X, BarChart3, Calendar } from "lucide-react"
import { monthNames } from "./constants"
import type { StatisticsHeaderProps } from "./types"

export function StatisticsHeader({ year, month, onClose }: StatisticsHeaderProps) {
  return (
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
  )
}

export function StatisticsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <BarChart3 className="w-16 h-16 text-gray-300 mb-4" />
      <p className="text-gray-500 text-lg font-medium">이번 달 기록된 감정이 없습니다</p>
      <p className="text-gray-400 mt-2">일기를 작성하면 감정 통계가 표시됩니다</p>
    </div>
  )
}

export function StatisticsSummary({ summary }: { summary: string }) {
  return (
    <div className="bg-gray-50 p-4 text-center border-t border-gray-100">
      <p className="text-sm text-gray-500">
        {summary}
      </p>
    </div>
  )
}
