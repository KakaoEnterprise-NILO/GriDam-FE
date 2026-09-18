"use client"

import { useState } from "react"
import EmotionChart from "./statistics-popup/EmotionChart"
import EmotionDistribution from "./statistics-popup/EmotionDistribution"
import { StatisticsHeader, StatisticsEmptyState, StatisticsSummary } from "./statistics-popup/StatisticsChrome"
import { getStatisticsData } from "./statistics-popup/utils"
import type { StatisticsPopupProps } from "./statistics-popup/types"

export default function StatisticsPopup({ open, onClose, data, year, month }: StatisticsPopupProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  if (!open) return null
  const { chartData, displayData, totalEntries, summary } = getStatisticsData(data)
  const handleEmotionClick = (index: number) => setActiveIndex(activeIndex === index ? null : index)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-3xl overflow-hidden shadow-2xl">
        <StatisticsHeader year={year} month={month} onClose={onClose} />
        <div className="p-6 md:p-8">
          {displayData.length === 0 ? <StatisticsEmptyState /> : <div className="flex flex-col md:flex-row items-center gap-8"><EmotionChart data={chartData} cellData={displayData} totalEntries={totalEntries} activeIndex={activeIndex} onActiveChange={setActiveIndex} /><EmotionDistribution data={displayData} totalEntries={totalEntries} activeIndex={activeIndex} onSelect={handleEmotionClick} /></div>}
        </div>
        <StatisticsSummary summary={summary} />
      </div>
    </div>
  )
}
