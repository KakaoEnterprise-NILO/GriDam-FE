"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../components/common/MainLayout"
import YearMonthPopup from "../../components/calendar/YearMonthPopup"
import StatisticsPopup from "../../components/calendar/StatisticsPopup"
import DiaryPopup from "../../components/calendar/DayDiaryPopup"
import { getCalendarDays } from "../../utils/getCalendarDays"
import { ChevronRight } from "lucide-react"
import { BarChart3 } from "lucide-react"
import api from "@/api/axios"

interface EmotionCardApiResponse {
  timestamp: string
  success: boolean
  code: string
  result: {
    cardImageUrl: string
    emotionCardId: number
    emotion: string
    emotions: { [key: string]: number }[]
  }
  message: string
}

interface DiaryEntry {
  diaryId: string
  title: string
  content: string
  date: string // "2025-06-06" format
  imageUrl: string
  hashtags: string[]
}

interface DiaryListApiResponse {
  timestamp: string
  success: boolean
  code: string
  result: DiaryEntry[]
  message: string
}

interface CalendarDiary {
  diaryId: string
  day: number
  emotion: string
  title: string
  hashtags: string[]
  date: string
  emotionData?: EmotionCardApiResponse["result"] // Add emotion data
}

export default function Calendar() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isStatsOpen, setIsStatsOpen] = useState(false)
  const [year, setYear] = useState(2025)
  const [month, setMonth] = useState(6)
  const [days, setDays] = useState<string[][]>([])
  const [diaryOpen, setDiaryOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [diaries, setDiaries] = useState<CalendarDiary[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 같은 날짜의 일기 중 가장 최신 것만 선택하는 함수
  // const getLatestDiaryPerDay = (diaryList: CalendarDiary[]) => {
  //   const diaryMap = new Map<number, CalendarDiary>()

  //   diaryList.forEach((diary) => {
  //     const existingDiary = diaryMap.get(diary.day)
  //     if (!existingDiary) {
  //       // 해당 날짜에 일기가 없으면 추가
  //       diaryMap.set(diary.day, diary)
  //     } else {
  //       // 이미 있으면 첫 번째 것 유지 (서버에서 정렬되어 온다고 가정)
  //       console.warn(`⚠️ ${diary.day}일에 중복 일기 발견:`, {
  //         existing: existingDiary.title,
  //         new: diary.title,
  //       })
  //     }
  //   })

  //   return Array.from(diaryMap.values())
  // }

  // API에서 일기 목록 데이터 가져오기
  const fetchDiaryListData = async () => {
    setLoading(true)
    setError(null)

    try {
      console.log(`🗓️ 일기 목록 데이터 요청`)

      const response = await api.get(`/diary/list`)
      const data: DiaryListApiResponse = response.data

      console.log("📅 일기 목록 API 전체 응답:", data)

      if (data.success) {
        const diaryList = data.result || []

        // 테스트 데이터 추가
        const testData: DiaryEntry[] = [
          {
            diaryId: "test-diary-1",
            title: "오늘은 정말 행복한 하루였어!",
            content:
              "친구들과 함께 놀이공원에 갔다. 롤러코스터도 타고 맛있는 음식도 먹고... 정말 즐거운 시간이었다. 이런 날이 더 많았으면 좋겠다.",
            date: "2025-06-01",
            imageUrl: "/placeholder.svg?height=200&width=300",
            hashtags: ["놀이공원", "친구들", "즐거움", "행복"],
          },
          {
            diaryId: "test-diary-2",
            title: "화가 나는 하루",
            content:
              "오늘은 정말 짜증나는 일이 많았다. 지하철이 연착되어서 약속에 늦었고, 카페에서 주문한 음료도 잘못 나왔다. 하루 종일 기분이 좋지 않았다.",
            date: "2025-06-10",
            imageUrl: "/placeholder.svg?height=200&width=300",
            hashtags: ["짜증", "연착", "기분나쁨"],
          },
        ]

        // 기존 데이터와 테스트 데이터 합치기
        const combinedDiaryList = [...diaryList, ...testData]

        console.log(`📝 서버에서 반환된 일기: ${diaryList.length}개, 테스트 데이터: ${testData.length}개`)

        // 현재 년월에 해당하는 일기만 필터링
        const currentMonthDiaries = combinedDiaryList.filter((diary) => {
          const diaryDate = new Date(diary.date)
          return diaryDate.getFullYear() === year && diaryDate.getMonth() + 1 === month
        })

        // 각 일기에 대해 감정 카드 데이터 가져오기
        const diariesWithEmotion = await Promise.all(
          currentMonthDiaries.map(async (diary) => {
            try {
              // 테스트 데이터인 경우 감정 데이터를 직접 설정
              if (diary.diaryId.startsWith("test-diary")) {
                const diaryDate = new Date(diary.date)
                let emotion = "NONE"

                if (diary.diaryId === "test-diary-1") {
                  emotion = "HAPPY" // 6월 1일 - 행복
                } else if (diary.diaryId === "test-diary-2") {
                  emotion = "ANGRY" // 6월 10일 - 화남
                }

                return {
                  diaryId: diary.diaryId,
                  day: diaryDate.getDate(),
                  emotion: emotion,
                  title: diary.title,
                  hashtags: diary.hashtags,
                  date: diary.date,
                  emotionData: {
                    cardImageUrl: "/placeholder.svg?height=280&width=280",
                    emotionCardId: Math.floor(Math.random() * 1000),
                    emotion: emotion,
                    emotions: [{ [emotion]: 100 }],
                  },
                } as CalendarDiary
              }

              // 실제 API 데이터인 경우 기존 로직 사용
              const emotionResponse = await api.get(`/emotion-cards/card-image?diaryId=${diary.diaryId}`)
              const emotionData = emotionResponse.data

              const diaryDate = new Date(diary.date)
              return {
                diaryId: diary.diaryId,
                day: diaryDate.getDate(),
                emotion: emotionData.success ? emotionData.result.emotion : "NONE",
                title: diary.title,
                hashtags: diary.hashtags,
                date: diary.date,
                emotionData: emotionData.success ? emotionData.result : undefined,
              } as CalendarDiary
            } catch (emotionErr) {
              console.warn(`감정 데이터 조회 실패 (diaryId: ${diary.diaryId}):`, emotionErr)
              const diaryDate = new Date(diary.date)
              return {
                diaryId: diary.diaryId,
                day: diaryDate.getDate(),
                emotion: "NONE",
                title: diary.title,
                hashtags: diary.hashtags,
                date: diary.date,
              } as CalendarDiary
            }
          }),
        )

        console.log(`✅ ${year}년 ${month}월 감정 데이터 포함 일기: ${diariesWithEmotion.length}개`)
        setDiaries(diariesWithEmotion)
      } else {
        throw new Error(data.message || "데이터를 가져오는데 실패했습니다.")
      }
    } catch (err: any) {
      console.error("❌ 일기 목록 조회 실패:", err)
      if (err.response?.status === 401) {
        setError("로그인이 필요합니다. 다시 로그인해주세요.")
      } else {
        setError(err.response?.data?.message || err.message || "일기 목록을 가져오는데 실패했습니다.")
      }
      setDiaries([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setDays(getCalendarDays(year, month))
    fetchDiaryListData()
  }, [year, month])

  const handleMonthSelect = (y: number, m: number) => {
    setYear(y)
    setMonth(m)
    setIsPopupOpen(false)
  }

  const findDiaryByDay = (day: string) => {
    const dayNum = Number.parseInt(day, 10)
    const foundDiary = diaries.find((d) => d.day === dayNum)

    if (foundDiary) {
      console.log(`🔍 ${day}일 일기 찾음:`, foundDiary)
    }

    return foundDiary
  }

  // 날짜 클릭 핸들러
  const handleDateClick = (day: string) => {
    if (!day) return

    const paddedMonth = String(month).padStart(2, "0")
    const paddedDay = String(day).padStart(2, "0")
    const fullDate = `${year}-${paddedMonth}-${paddedDay}`

    console.log(`📅 날짜 클릭: ${fullDate}`)

    // 해당 날짜의 일기 찾기
    //const dayNum = Number.parseInt(day, 10)
    //const foundDiary = diaries.find((d) => d.day === dayNum)

    setSelectedDate(fullDate)
    setDiaryOpen(true)
  }

  // 감정에 따른 색상 매핑 (더 부드럽고 세련된 색상)
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

  // 감정에 따른 테두리 색상 (더 부드럽게)
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

  // 감정에 따른 이모지
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

  // 통계 데이터 계산
  const getStatisticsData = () => {
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

  // 디버깅 정보 표시
  const showDebugInfo = () => {
    console.log("=== 🐛 디버깅 정보 ===")
    console.log("현재 년월:", year, month)
    console.log("accessToken:", localStorage.getItem("accessToken") ? "있음" : "없음")
    console.log("refreshToken:", localStorage.getItem("refreshToken") ? "있음" : "없음")
    console.log("필터링된 일기 데이터 개수:", diaries.length)
    console.log("필터링된 일기 데이터:", diaries)
    console.log("===================")

    // 서버 문제 진단
    console.log("🔍 서버 문제 진단:")
    console.log("- 30개의 일기가 반환되는 것은 서버에서 사용자별 필터링이 안 되고 있음을 의미")
    console.log("- /api/calendar API가 Authorization 헤더를 무시하거나 잘못 처리하고 있을 가능성")
    console.log("- 서버 개발자에게 사용자별 일기 필터링 로직 확인 요청 필요")
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
              <button
                onClick={showDebugInfo}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-colors font-medium"
              >
                디버그 정보
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
        {/* 헤더 */}
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

        {/* 요일 헤더 */}
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

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 gap-2">
          {days.flat().map((day, idx) => {
            const diary = day ? findDiaryByDay(day) : null
            const bgColor = diary ? getEmotionColor(diary.emotion) : ""
            const borderColor = diary ? getBorderColor(diary.emotion) : ""

            return (
              <div
                key={idx}
                onClick={() => handleDateClick(day)}
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
                      <span className="text-2xl">{getEmotionEmoji(diary.emotion)}</span>
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <p
                        className="text-xs font-semibold text-gray-800 line-clamp-2 leading-tight mb-1"
                        title={diary.title}
                      >
                        {diary.title}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {diary.hashtags.slice(0, 1).map((tag, i) => (
                          <span
                            key={i}
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
          })}
        </div>
      </div>

      {/* 팝업들 */}
      {isPopupOpen && (
        <YearMonthPopup selectedYear={year} onSelect={handleMonthSelect} onClose={() => setIsPopupOpen(false)} />
      )}

      <StatisticsPopup
        open={isStatsOpen}
        onClose={() => setIsStatsOpen(false)}
        data={getStatisticsData()}
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
