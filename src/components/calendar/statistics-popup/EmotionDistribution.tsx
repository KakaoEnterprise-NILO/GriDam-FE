import type { EmotionDistributionProps } from "./types"

export default function EmotionDistribution({ data, totalEntries, activeIndex, onSelect }: EmotionDistributionProps) {
  return (
    <div className="w-full md:w-1/2">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">감정 분포</h3>
      <div className="space-y-3">
        {data.map((item, idx) => (
          <div
            key={item.name}
            className={`flex items-center p-3 rounded-xl cursor-pointer transition-all duration-200 ${
              activeIndex === idx ? "bg-gray-100" : "hover:bg-gray-50"
            }`}
            onClick={() => onSelect(idx)}
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
  )
}
