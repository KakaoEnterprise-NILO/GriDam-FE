import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { PIE_OPTIONS } from "./constants"
import type { CustomTooltipProps, EmotionChartProps } from "./types"

const CustomTooltip = ({ active, payload, totalEntries }: CustomTooltipProps) => {
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

export default function EmotionChart({ data, cellData, totalEntries, activeIndex, onActiveChange }: EmotionChartProps) {
  return (
    <div className="w-full md:w-1/2">
      <div className="h-[300px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              {...PIE_OPTIONS}
              onMouseEnter={(_, index) => onActiveChange(index)}
              onMouseLeave={() => onActiveChange(null)}
            >
              {cellData.map((entry, index) => (
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
            <Tooltip content={<CustomTooltip totalEntries={totalEntries} />} />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-3xl font-bold text-gray-800">{totalEntries}</p>
          <p className="text-gray-500 text-sm">총 기록</p>
        </div>
      </div>
    </div>
  )
}
