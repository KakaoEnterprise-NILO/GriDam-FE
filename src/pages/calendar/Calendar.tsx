import { useState, useEffect } from 'react'
import MainLayout from '../../components/common/MainLayout'
import YearMonthPopup from '../../components/calendar/YearMonthPopup'
import StatisticsPopup from '../../components/calendar/StatisticsPopup'
import DiaryPopup from '../../components/calendar/DayDiaryPopup'
import { getCalendarDays } from '../../utils/getCalendarDays'
import { ChevronRight } from 'lucide-react'
import { useDiaryStore } from '@/store/diaryStore'

export default function Calendar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(5)
  const [days, setDays] = useState<string[][]>([])
  const [diaryOpen, setDiaryOpen] = useState(false)
  const [selectedDiaryId, setSelectedDiaryId] = useState<number | null>(null)

  const diaries = useDiaryStore((state) => state.diaries)

  useEffect(() => {
    setDays(getCalendarDays(year, month))
  }, [year, month])

  const handleMonthSelect = (y: number, m: number) => {
    setYear(y)
    setMonth(m)
    setIsPopupOpen(false)
  }

  const findDiaryByDate = (dateStr: string) => {
    return diaries.find((d) => d.date === dateStr)
  }

const getBorderColor = (bgColor: string | undefined) => {
  if (!bgColor) return '';
  const match = bgColor.match(/bg-(\w+)-(\d+)/);
  if (!match) return '';
  const colorName = match[1]; // green, purple 등
  const number = parseInt(match[2], 10);

  // 숫자에 200 더하기, 최대 900으로 제한
  let borderNumber = number + 200;
  if (borderNumber > 900) borderNumber = 900;

  return `border-${colorName}-${borderNumber}`;
};

  return (
    <MainLayout>
      <div className="w-full max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 py-6">
        {/* 상단 */}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => setIsPopupOpen(true)} className="flex items-center text-xl font-bold">
            {year}년도 {month}월 <ChevronRight className="ml-1 w-5 h-5" />
          </button>
          <button
            onClick={() => setIsStatsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold"
          >
            통계보기
          </button>
        </div>

        {/* 요일 헤더 */}
        <div className="grid grid-cols-7 border-t border-l text-center text-sm font-medium text-gray-500">
          {['SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'].map((day) => (
            <div key={day} className="py-2 border-r border-b bg-gray-50">{day}</div>
          ))}
        </div>

        {/* 날짜 셀 */}
        <div className="grid grid-cols-7 border-t border-l">
          {days.flat().map((day, idx) => {
            const paddedMonth = String(month).padStart(2, '0')
            const paddedDay = String(day).padStart(2, '0')
            const fullDate = `${year}-${paddedMonth}-${paddedDay}`
            const diary = findDiaryByDate(fullDate)

            const bgColor = diary?.color || ''
            const borderColor = getBorderColor(bgColor)

            return (
              <div
                key={idx}
                onClick={() => {
                  if (diary) {
                    setSelectedDiaryId(diary.id)
                    setDiaryOpen(true)
                  }
                }}
                className={`aspect-square p-2 text-sm relative cursor-pointer 
                  ${diary ? `border-2 ${bgColor} ${borderColor}` : 'border border-gray-100'}`}
              >
                {day && diary ? (
                  <div className="h-full w-full flex flex-col justify-between">
                    <div className="text-xs font-semibold text-center text-gray-700">
                      <span>{day}</span>
                    </div>
                    <div className="absolute top-2 right-2 text-xs text-gray-500">📌</div>
                    <div className="mt-2">
                      <p className="text-2xl">
                        {diary.emotion === '기쁨' ? '😊' : diary.emotion === '우울' ? '😔' : '😐'}
                      </p>
                      <p className="font-bold text-base mt-1">{diary.title}</p>
                      <p className="text-gray-500 text-xs mt-1">#{diary.hashtags.join(' #')}</p>
                    </div>
                  </div>
                ) : (
                  <span className="font-bold text-xs text-gray-400">{day}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* 연월 선택 */}
      {isPopupOpen && (
        <YearMonthPopup
          selectedYear={year}
          onSelect={handleMonthSelect}
          onClose={() => setIsPopupOpen(false)}
        />
      )}

      {/* 통계 팝업 */}
      <StatisticsPopup
        open={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        data={[
          { name: '기쁨', value: 58, color: '#86efac', emoji: '😊' },
          { name: '우울', value: 30, color: '#f87171', emoji: '😔' },
          { name: '무감정', value: 10, color: '#a3a3a3', emoji: '😐' },
        ]}
        year={year}
        month={month}
      />

      {/* 일기 팝업 */}
      {selectedDiaryId !== null && (
        <DiaryPopup
          open={diaryOpen}
          onClose={() => {
            setDiaryOpen(false)
            setSelectedDiaryId(null)
          }}
          diaryId={selectedDiaryId}
        />
      )}
    </MainLayout>
  )
}
