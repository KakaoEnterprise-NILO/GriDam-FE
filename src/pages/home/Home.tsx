"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../components/common/MainLayout"
import { useNavigate } from "react-router-dom"
import logoUrl from "@/assets/picture/gridam.svg"
import DiaryCard from "../../components/diary/DiaryCard"
import DiaryPagination from "../../components/diary/DiaryPagination"
import api from "../../api/axios" // 커스텀 axios 인스턴스 사용

// 일기 타입
type DiaryItem = {
  diaryId: string
  title: string
  content: string
  date: string
  imageUrl: string
  hashtags: string[]
}

type ApiResponse = {
  timestamp: string
  success: boolean
  code: string
  result: DiaryItem[]
  message: string
}

export default function Home() {
  const navigate = useNavigate()

  // 로그인 상태, 로딩 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // 일기 상태
  const [diaries, setDiaries] = useState<DiaryItem[]>([])
  const [diaryLoading, setDiaryLoading] = useState(false)
  const [diaryError, setDiaryError] = useState<string | null>(null)

  // 페이징 상태 (일기 목록용)
  const [page, setPage] = useState(1)
  const ITEMS_PER_PAGE = 3

  // 토큰 체크 및 일기 목록 조회
  useEffect(() => {
    const checkAndFetch = async () => {
      const token = localStorage.getItem("accessToken")
      setIsLoggedIn(!!token)

      if (!token) {
        // 로그인 안된 상태
        setIsLoading(false)
        return
      }

      // 로그인 상태면 일기 목록 조회
      setDiaryLoading(true)
      setDiaryError(null)
      try {
        const response = await api.get<ApiResponse>("/diary/list")
        if (response.data.success) {
          setDiaries(response.data.result)

          // 일기가 1개 이상이면 바로 일기 목록 화면으로 이동
          if (response.data.result.length > 0) {
            navigate("/homeDiary") // 여기서 "my-diary" 는 일기 목록 페이지 경로입니다. 필요시 맞게 수정하세요.
            return
          }
        } else {
          setDiaryError(response.data.message || "일기를 불러오는데 실패했습니다.")
        }
      } catch (err: any) {
        setDiaryError(err.response?.data?.message || "일기 목록 조회 중 오류가 발생했습니다.")
      } finally {
        setDiaryLoading(false)
        setIsLoading(false)
      }
    }

    checkAndFetch()

    // storage 이벤트 리스너 (다른 탭에서 로그인 상태 변동 감지용)
    const handleStorageChange = () => {
      const token = localStorage.getItem("accessToken")
      setIsLoggedIn(!!token)
    }
    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  }, [navigate])

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    )
  }

  // 로그인 안된 상태 혹은 로그인했지만 일기가 0개인 상태에서 보여주는 기본 홈 화면
  const features = [
    {
      icon: "📝",
      title: "감정을 기록하고 싶은 분",
      description: "그리담은 일기를 쓰고 감정을 분석해 줍니다.",
      color: "from-blue-50 to-indigo-50",
      hoverColor: "hover:from-blue-100 hover:to-indigo-100",
    },
    {
      icon: "😊",
      title: "일기를 공유하고 싶은 분",
      description: "일기를 쓰고 감정카드도 만들어 사람들과 소통할 수 있습니다.",
      color: "from-purple-50 to-pink-50",
      hoverColor: "hover:from-purple-100 hover:to-pink-100",
    },
    {
      icon: "📘",
      title: "감정을 관리하고 싶은 분",
      description: "캘린더를 통해 보기 쉽게 감정 추이를 볼 수 있습니다.",
      color: "from-green-50 to-emerald-50",
      hoverColor: "hover:from-green-100 hover:to-emerald-100",
    },
  ]

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

        <div className="flex flex-col items-center text-center py-16 px-4">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src={logoUrl || "/placeholder.svg"}
              alt="그리담 로고"
              className="relative w-72 h-60 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              감정 일기장
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              당신의 감정을 기록하고, 분석하고, 공유하는 특별한 공간
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            {isLoggedIn ? (
              <button
                onClick={() => navigate("/diary/write")}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10">✨ 일기 작성하기</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="relative z-10">로그인</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="group relative px-8 py-4 bg-white text-blue-600 font-semibold border-2 border-blue-500 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-blue-50"
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">그리담, 이렇게 활용하세요</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${feature.color} ${feature.hoverColor} p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/50 to-white/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
