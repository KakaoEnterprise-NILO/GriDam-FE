"use client"

import { useState, useEffect } from "react"
import { useWordCloudStatistics } from "@/hooks/useWordCloudStatistics"
import WordCloudGrid from "@/components/statistics/WordCloudGrid"
import WordCloudModal from "@/components/statistics/WordCloudModal"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, Calendar, Sparkles, BarChart3 } from "lucide-react"
import MainLayout from "@/components/common/MainLayout"

export default function StatisticsPage() {
  const { wordClouds, userInfo, loading, generating, generatedAt, nextGeneration, fetchWordCloud, handleGenerateWordCloud } = useWordCloudStatistics()
  const [selectedImage, setSelectedImage] = useState<{ url: string; emotion: string } | null>(null)

  const formatDate = (dateString: string) => {
    if (!dateString) return ""
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      행복: "bg-yellow-50 text-yellow-700 border-yellow-200",
      기쁨: "bg-amber-50 text-amber-700 border-amber-200",
      슬픔: "bg-blue-50 text-blue-700 border-blue-200",
      불안: "bg-purple-50 text-purple-700 border-purple-200",
      화남: "bg-red-50 text-red-700 border-red-200",
      놀람: "bg-orange-50 text-orange-700 border-orange-200",
      역겨움: "bg-green-50 text-green-700 border-green-200",
      두려움: "bg-gray-50 text-gray-700 border-gray-200",
      없음: "bg-slate-50 text-slate-700 border-slate-200",
    }
    return colors[emotion] || "bg-gray-50 text-gray-700 border-gray-200"
  }

  const getEmotionCardColor = (emotion: string) => {
    const cardColors: Record<string, string> = {
      행복: "bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300",
      기쁨: "bg-gradient-to-br from-amber-100 to-amber-200 border-amber-300",
      슬픔: "bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300",
      불안: "bg-gradient-to-br from-purple-100 to-purple-200 border-purple-300",
      화남: "bg-gradient-to-br from-red-100 to-red-200 border-red-300",
      놀람: "bg-gradient-to-br from-orange-100 to-orange-200 border-orange-300",
      역겨움: "bg-gradient-to-br from-green-100 to-green-200 border-green-300",
      두려움: "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300",
      없음: "bg-gradient-to-br from-slate-100 to-slate-200 border-slate-300",
    }
    return cardColors[emotion] || "bg-gradient-to-br from-gray-100 to-gray-200 border-gray-300"
  }

  const handleImageClick = (url: string, emotion: string) => {
    setSelectedImage({ url, emotion })
  }

  const closeModal = () => {
    setSelectedImage(null)
  }

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    if (selectedImage) {
      document.addEventListener("keydown", handleEscKey)
      document.body.style.overflow = "hidden" // 스크롤 방지
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
      document.body.style.overflow = "unset"
    }
  }, [selectedImage])

  if (loading) {
    return (
      <MainLayout>
        <div className="ml-2 w-full bg-white rounded-3xl shadow-lg max-w-4xl mx-auto px-6 md:px-10 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6">
                <Skeleton className="h-6 w-20 mb-4" />
                <Skeleton className="h-64 w-full rounded-xl" />
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <div className="ml-2 w-full bg-white rounded-3xl shadow-lg max-w-6xl mx-auto px-6 md:px-10 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-3 text-gray-800">
              <BarChart3 className="h-6 w-6 text-blue-500" />
              통계
              {userInfo && <span className="text-lg font-normal text-gray-600">- {userInfo.userName}님</span>}
            </h1>
            <p className="text-gray-600 mt-2">일기에서 추출한 감정별 키워드를 확인해보세요</p>
            {userInfo && (
              <p className="text-sm text-gray-500 mt-1">
                총 {userInfo.diaryCount}개의 일기 작성 • {userInfo.followerCount}명의 팔로워
              </p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={fetchWordCloud}
              disabled={loading}
              className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl transition-colors font-medium disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              새로고침
            </button>
            <button
              onClick={handleGenerateWordCloud}
              disabled={generating}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Sparkles className={`h-4 w-4 ${generating ? "animate-pulse" : ""}`} />
              {generating ? "생성 중..." : "새로 생성"}
            </button>
          </div>
        </div>

        {generatedAt && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">마지막 생성: {formatDate(generatedAt)}</span>
              </div>
              {nextGeneration && (
                <div className="flex items-center gap-2">
                </div>
              )}
            </div>
          </div>
        )}

        <WordCloudGrid
          wordClouds={wordClouds}
          generating={generating}
          handleGenerateWordCloud={handleGenerateWordCloud}
          handleImageClick={handleImageClick}
          getEmotionColor={getEmotionColor}
          getEmotionCardColor={getEmotionCardColor}
        />

        <WordCloudModal
          selectedImage={selectedImage}
          closeModal={closeModal}
          getEmotionColor={getEmotionColor}
          getEmotionCardColor={getEmotionCardColor}
        />
      </div>
    </MainLayout>
  )
}
