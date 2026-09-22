import { useState } from "react";
import MainLayout from "@/components/common/MainLayout";
import YearMonthPopup from "@/components/calendar/YearMonthPopup";
import StatisticsPopup from "@/components/calendar/StatisticsPopup";
import DiaryPopup from "@/components/calendar/DayDiaryPopup";
import CalendarHeader from "@/components/calendar/CalendarHeader";
import CalendarGrid from "@/components/calendar/CalendarGrid";
import CalendarErrorState from "@/components/calendar/CalendarErrorState";
import { getCalendarDays } from "@/components/calendar/getCalendarDays";
import {
  getEmotionColor,
  getBorderColor,
  getEmotionEmoji,
  getStatisticsData,
} from "@/components/calendar/utils";
import { useCalendarDiaries } from "@/components/calendar/useCalendarDiaries";
import { cn } from "@/lib/utils";

export default function Calendar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [year, setYear] = useState(2025);
  const [month, setMonth] = useState(6);
  const [diaryOpen, setDiaryOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const { diaries, loading, error, fetchDiaryListData } = useCalendarDiaries(
    year,
    month,
  );

  const days = getCalendarDays(year, month);

  const handleMonthSelect = (nextYear: number, nextMonth: number) => {
    setYear(nextYear);
    setMonth(nextMonth);
    setIsPopupOpen(false);
  };

  const findDiaryByDay = (day: string) =>
    diaries.find((diary) => diary.day === Number.parseInt(day, 10));

  const handleDateClick = (day: string) => {
    if (!day) return;
    setSelectedDate(
      `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
    );
    setDiaryOpen(true);
  };

  const selectedDiaryId = selectedDate
    ? diaries.find(
        (diary) =>
          diary.day === Number.parseInt(selectedDate.split("-")[2], 10),
      )?.diaryId
    : undefined;

  if (error)
    return <CalendarErrorState error={error} onRetry={fetchDiaryListData} />;

  return (
    <MainLayout>
      <div
        className={`
          ml-2 w-full
          bg-white
          rounded-3xl shadow-lg
          max-w-4xl mx-auto px-6 md:px-10 py-8
        `}
      >
        <CalendarHeader
          year={year}
          month={month}
          onMonthClick={() => setIsPopupOpen(true)}
          onStatisticsClick={() => setIsStatsOpen(true)}
        />
        {loading && (
          <div className="text-center py-12">
            <div
              className={cn(
                "animate-spin",
                "rounded-full",
                "h-8 w-8",
                "border-b-2 border-blue-500",
                "mx-auto mb-4",
              )}
            ></div>
            <p className="text-gray-500 font-medium">데이터를 불러오는 중...</p>
          </div>
        )}
        <CalendarGrid
          days={days}
          year={year}
          month={month}
          getDiaryByDay={findDiaryByDay}
          getEmotionColor={getEmotionColor}
          getBorderColor={getBorderColor}
          getEmotionEmoji={getEmotionEmoji}
          onDateClick={handleDateClick}
        />
      </div>
      {isPopupOpen && (
        <YearMonthPopup
          selectedYear={year}
          onSelect={handleMonthSelect}
          onClose={() => setIsPopupOpen(false)}
        />
      )}
      <StatisticsPopup
        open={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        data={getStatisticsData(diaries)}
        year={year}
        month={month}
      />
      {selectedDate && (
        <DiaryPopup
          open={diaryOpen}
          onClose={() => {
            setDiaryOpen(false);
            setSelectedDate(null);
          }}
          date={selectedDate}
          diaryId={selectedDiaryId}
        />
      )}
    </MainLayout>
  );
}
