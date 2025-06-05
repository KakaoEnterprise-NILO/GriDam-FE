"use client"

import { useState, useEffect } from "react"
import MainLayout from "../../components/common/MainLayout"
import { useNavigate } from "react-router-dom"
import logoUrl from "@/assets/picture/gridam.svg"

export default function Home() {
  const navigate = useNavigate()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken")
      setIsLoggedIn(!!token)
      setIsLoading(false)
    }

    checkToken()
    window.addEventListener("storage", checkToken)

    return () => window.removeEventListener("storage", checkToken)
  }, [])

  const features = [
    {
      icon: "📝",
      title: "감정을 기록하고 싶은 분",
      description: "그리담 일기장은 일기를 쓰고 감정을 분석해 줍니다.",
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

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>

        <div className="flex flex-col items-center text-center py-16 px-4">
          {/* Logo with enhanced styling */}
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
            <img
              src={logoUrl || "/placeholder.svg"}
              alt="그리담 로고"
              className="relative w-72 h-60 object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Title with gradient text */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              감정 일기장
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              당신의 감정을 기록하고, 분석하고, 공유하는 특별한 공간
            </p>
          </div>

          {/* Action buttons with improved styling */}
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
            <h2 className="text-3xl font-bold text-gray-800 mb-4">그리담 일기장, 이렇게 활용하세요</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${feature.color} ${feature.hoverColor} p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-3 transition-all duration-500 cursor-pointer border border-white/50`}
              >
                {/* Card glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Icon with animation */}
                <div className="relative text-center mb-6">
                  <div className="text-6xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <h3 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-purple-400 rounded-full opacity-60"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Call to action section */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-16 h-16 border border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">지금 바로 시작해보세요!</h3>
              <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                당신의 감정 여행을 그리담과 함께 시작하고, 더 나은 자신을 발견해보세요.
              </p>
              {!isLoggedIn && (
                <button
                  onClick={() => navigate("/register")}
                  className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl hover:bg-gray-50 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  무료로 시작하기 →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
