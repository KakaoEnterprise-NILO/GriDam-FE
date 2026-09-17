"use client"

import { useState } from "react"
import MainLayout from "../../components/common/MainLayout"
import YearMonthPopup from "../../components/calendar/YearMonthPopup"
import StatisticsPopup from "../../components/calendar/StatisticsPopup"
import DiaryPopup from "../../components/calendar/DayDiaryPopup"
import { getCalendarDays } from "../../utils/getCalendarDays"
import { ChevronRight } from 'lucide-react'
import { BarChart3 } from 'lucide-react'
import { useCalendarDiaries, type CalendarDiary } from "@/hooks/useCalendarDiaries"
import CalendarDayCell from "@/components/calendar/CalendarDayCell"

const getEmotionColor = (emotion: string) => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "bg-gradient-to-br from-yellow-100 to-yellow-200"
    case "JOY":
    case "기쁨":
      return "bg-gradient-to-br from-emerald-100 to-emerald-200"
    case "SAD":
    case "슬픔":
      return "bg-gradient-to-br from-blue-100 to-blue-200"
    case "ANXIOUS":
    case "불안":
      return "bg-gradient-to-br from-purple-100 to-purple-200"
    case "ANGRY":
    case "화남":
      return "bg-gradient-to-br from-rose-100 to-rose-200"
    case "SURPRISE":
    case "놀람":
      return "bg-gradient-to-br from-orange-100 to-orange-200"
    case "DISGUST":
    case "역겨움":
      return "bg-gradient-to-br from-gray-100 to-gray-200"
    case "FEAR":
    case "두려움":
      return "bg-gradient-to-br from-slate-100 to-slate-200"
    case "NONE":
    case "없음":
      return "bg-gradient-to-br from-gray-50 to-gray-100"
    default:
      return "bg-gradient-to-br from-gray-50 to-gray-100"
  }
}

const getBorderColor = (emotion: string) => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "border-yellow-300"
    case "JOY":
    case "기쁨":
      return "border-emerald-300"
    case "SAD":
    case "슬픔":
      return "border-blue-300"
    case "ANXIOUS":
    case "불안":
      return "border-purple-300"
    case "ANGRY":
    case "화남":
      return "border-rose-300"
    case "SURPRISE":
    case "놀람":
      return "border-orange-300"
    case "DISGUST":
    case "역겨움":
      return "border-gray-300"
    case "FEAR":
    case "두려움":
      return "border-slate-300"
    case "NONE":
    case "없음":
      return "border-gray-200"
    default:
      return "border-gray-200"
  }
}

const getEmotionEmoji = (emotion: string) => {
  switch (emotion) {
    case "HAPPY":
    case "행복":
      return "😊"
    case "JOY":
    case "기쁨":
      return "😄"
    case "SAD":
    case "슬픔":
      return "😢"
    case "ANXIOUS":
    case "불안":
      return "😰"
    case "ANGRY":
    case "화남":
      return "😠"
    case "SURPRISE":
    case "놀람":
      return "😲"
    case "DISGUST":
    case "역겨움":
      return "🤢"
    case "FEAR":
    case "두려움":
      return "😨"
    case "NONE":
    case "없음":
      return "😐"
    default:
      return "😐"
  }
}

const getStatisticsData = (diaries: CalendarDiary[]) => {
  const emotionCounts: { [key: string]: number } = {}

  diaries.forEach((diary) => {
    emotionCounts[diary.emotion] = (emotionCounts[diary.emotion] || 0) + 1
  })

  return Object.entries(emotionCounts).map(([emotion, count]) => ({
    name: emotion,
    value: count,
    color: getEmotionColor(emotion).replace("bg-", "#"),
    emoji: getEmotionEmoji(emotion),
  }))
}


export default function Calendar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(6)
  const days = getCalendarDays(year, month)
  const [diaryOpen, setDiaryOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const { diaries, loading, error, fetchDiaryListData } = useCalendarDiaries(year, month)

  const handleMonthSelect = (y: number, m: number) => {
    setYear(y)
    setMonth(m)
    setIsPopupOpen(false)
  }

  const findDiaryByDay = (day: string) => {
    const dayNum = Number.parseInt(day, 10)
    const foundDiary = diaries.find((d) => d.day === dayNum)


    return foundDiary
  }

  const handleDateClick = (day: string) => {
    if (!day) return

    const paddedMonth = String(month).padStart(2, "0")
    const paddedDay = String(day).padStart(2, "0")
    const fullDate = `${year}-${paddedMonth}-${paddedDay}`



    setSelectedDate(fullDate)
    setDiaryOpen(true)
  }



  if (error) {
    return (
      <MainLayout>
        <div className="w-full bg-white rounded-3xl shadow-lg max-w-4xl mx-auto px-6 md:px-10 py-8">
          <div className="text-center py-12">
            <div className="text-red-400 text-5xl mb-6">🚨</div>
            <h3 className="text-red-600 mb-4 font-semibold text-lg">서버 오류</h3>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">{error}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => fetchDiaryListData()}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl transition-colors font-medium"
              >
                다시 시도
              </button>
            </div>
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="ml-2 w-full bg-white rounded-3xl shadow-lg max-w-4xl mx-auto px-6 md:px-10 py-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => setIsPopupOpen(true)}
            className="flex items-center text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
          >
            {year}년 {month}월
            <ChevronRight className="ml-2 w-6 h-6" />
          </button>
          <button
            onClick={() => setIsStatsOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105"
          >
            <BarChart3 className="w-5 h-5" />
            통계
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-500 font-medium">데이터를 불러오는 중...</p>
          </div>
        )}

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
            const diary = day ? findDiaryByDay(day) : null
            const bgColor = diary ? getEmotionColor(diary.emotion) : ""
            const borderColor = diary ? getBorderColor(diary.emotion) : ""

            return (
              <CalendarDayCell
                key={day ? `${year}-${month}-${day}` : `${year}-${month}-empty-${idx}`}
                day={day}
                diary={diary}
                bgColor={bgColor}
                borderColor={borderColor}
                emoji={diary ? getEmotionEmoji(diary.emotion) : ""}
                onSelect={handleDateClick}
              />
            )
          })}
        </div>
      </div>

      {isPopupOpen && (
        <YearMonthPopup selectedYear={year} onSelect={handleMonthSelect} onClose={() => setIsPopupOpen(false)} />
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
            setDiaryOpen(false)
            setSelectedDate(null)
          }}
          date={selectedDate}
          diaryId={diaries.find((d) => d.day === Number.parseInt(selectedDate.split("-")[2], 10))?.diaryId}
        />
      )}
    </MainLayout>
  )
}
