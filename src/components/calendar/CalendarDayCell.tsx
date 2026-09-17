import type { CalendarDiary } from "@/hooks/useCalendarDiaries"

interface CalendarDayCellProps {
  day: string
  diary?: CalendarDiary | null
  bgColor: string
  borderColor: string
  emoji: string
  onSelect: (day: string) => void
}

export default function CalendarDayCell({ day, diary, bgColor, borderColor, emoji, onSelect }: CalendarDayCellProps) {
  return (
    <div
      onClick={() => onSelect(day)}
      className={`aspect-square rounded-2xl p-3 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-md
        ${
          diary
            ? `${bgColor} border-2 ${borderColor} shadow-sm`
            : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
        }`}
    >
      {day && diary ? (
        <div className="h-full flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <span className="text-sm font-bold text-gray-700">{day}</span>
            <span className="text-2xl">{emoji}</span>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <p
              className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-1"
              title={diary.title}
            >
              {diary.title}
            </p>
            <div className="flex flex-wrap gap-1">
              {diary.hashtags.slice(0, 1).map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-white bg-opacity-60 text-gray-600 px-2 py-0.5 rounded-full truncate max-w-full"
                >
                  #{tag}
                </span>
              ))}
              {diary.hashtags.length > 1 && (
                <span className="text-xs text-gray-500">+{diary.hashtags.length - 1}</span>
              )}
            </div>
          </div>
        </div>
      ) : day ? (
        <div className="h-full flex items-start">
          <span className="text-sm font-medium text-gray-400">{day}</span>
        </div>
      ) : null}
    </div>
  )
}
