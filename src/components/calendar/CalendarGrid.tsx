import type { CalendarDiary } from "@/hooks/useCalendarDiaries";
import CalendarDayCell from "./CalendarDayCell";
interface Props {
  days: string[][];
  year: number;
  month: number;
  getDiaryByDay: (day: string) => CalendarDiary | undefined;
  getEmotionColor: (emotion: string) => string;
  getBorderColor: (emotion: string) => string;
  getEmotionEmoji: (emotion: string) => string;
  onDateClick: (day: string) => void;
}
export default function CalendarGrid({
  days,
  year,
  month,
  getDiaryByDay,
  getEmotionColor,
  getBorderColor,
  getEmotionEmoji,
  onDateClick,
}: Props) {
  return (
    <>
      <div className="grid grid-cols-7 mb-2">
        {["일", "월", "화", "수", "목", "금", "토"].map((day, idx) => (
          <div key={day} className="py-4 text-center">
            <span
              className={`text-sm font-semibold ${idx === 0 ? "text-red-400" : idx === 6 ? "text-blue-400" : "text-gray-600"}`}
            >
              {day}
            </span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {days.flat().map((day, idx) => {
          const diary = day ? getDiaryByDay(day) : null;
          return (
            <CalendarDayCell
              key={
                day
                  ? `${year}-${month}-${day}`
                  : `${year}-${month}-empty-${idx}`
              }
              day={day}
              diary={diary}
              bgColor={diary ? getEmotionColor(diary.emotion) : ""}
              borderColor={diary ? getBorderColor(diary.emotion) : ""}
              emoji={diary ? getEmotionEmoji(diary.emotion) : ""}
              onSelect={onDateClick}
            />
          );
        })}
      </div>
    </>
  );
}
