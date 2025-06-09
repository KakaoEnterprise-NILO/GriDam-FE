"use client"

import { useState, useEffect } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, Calendar, Sparkles, BarChart3 } from "lucide-react"
import MainLayout from "@/components/common/MainLayout"

// 샘플 데이터 타입 정의
interface EmotionWordCloud {
  emotion: string
  url: string
}

interface UserInfo {
  userId: string
  userName: string
  diaryCount: number
  followerCount: number
}

export default function WordCloudStats() {
  const [wordClouds, setWordClouds] = useState<EmotionWordCloud[]>([])
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [generatedAt, setGeneratedAt] = useState<string>("")
  const [nextGeneration, setNextGeneration] = useState<string>("")
  const [selectedImage, setSelectedImage] = useState<{ url: string; emotion: string } | null>(null)

  // 샘플 사용자 데이터
  const sampleUserInfo: UserInfo = {
    userId: "user123",
    userName: "김범진",
    diaryCount: 1,
    followerCount: 3,
  }

  // 샘플 워드클라우드 데이터
  const sampleWordClouds: EmotionWordCloud[] = [
    {
      emotion: "행복",
      url: "/wordcloud.png",
    },
    {
      emotion: "불안",
      url: "/wordcloud2.png",
    },
    {
      emotion: "화남",
      url: "/wordcloud3.png",
    },
    {
      emotion: "기쁨",
      url: "/wordcloud.png",
    },
    {
      emotion: "슬픔",
      url: "/wordcloud.png",
    },
    {
      emotion: "놀람",
      url: "/wordcloud.png",
    },
    {
      emotion: "역겨움",
      url: "/wordcloud.png",
    },
    {
      emotion: "두려움",
      url: "/wordcloud.png",
    },
  ]

  // 사용자 정보 가져오기 (샘플 데이터 사용)
  const fetchUserInfo = async () => {
    try {
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 500))
      setUserInfo(sampleUserInfo)
      console.log("✅ 사용자 정보 로드 성공:", sampleUserInfo.userId)
      return sampleUserInfo.userId
    } catch (error) {
      console.error("❌ 사용자 정보 불러오기 실패:", error)
      return null
    }
  }

  const fetchWordCloud = async () => {
    try {
      setLoading(true)
      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setWordClouds(sampleWordClouds)
      setGeneratedAt(new Date().toISOString())

      // 다음 생성 가능 시간 (24시간 후)
      const nextGen = new Date()
      nextGen.setHours(nextGen.getHours() + 24)
      setNextGeneration(nextGen.toISOString())

      console.log("✅ 워드클라우드 데이터 로드 성공")
    } catch (error) {
      console.error("❌ 워드클라우드 불러오기 실패:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateWordCloud = async () => {
    try {
      setGenerating(true)

      // 사용자 정보가 없으면 먼저 가져오기
      let userId: string | null | undefined
      if (!userInfo) {
        userId = await fetchUserInfo()
        if (!userId) {
          console.error("❌ 사용자 ID를 가져올 수 없습니다")
          return
        }
      }

      // 실제 API 호출 시뮬레이션
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 새로운 워드클라우드 생성 (랜덤하게 일부만 표시)
      const shuffled = [...sampleWordClouds].sort(() => 0.5 - Math.random())
      const newWordClouds = shuffled.slice(0, Math.floor(Math.random() * 4) + 3)

      setWordClouds(newWordClouds)
      setGeneratedAt(new Date().toISOString())

      const nextGen = new Date()
      nextGen.setHours(nextGen.getHours() + 24)
      setNextGeneration(nextGen.toISOString())

      console.log("✅ 새로운 워드클라우드가 생성되었습니다!")
    } catch (error) {
      console.error("❌ 워드클라우드 생성 실패:", error)
    } finally {
      setGenerating(false)
    }
  }

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

  // 컴포넌트 마운트 시 사용자 정보와 워드클라우드 데이터 가져오기
  useEffect(() => {
    const initializeData = async () => {
      await fetchUserInfo()
      await fetchWordCloud()
    }
    initializeData()
  }, [])

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
        {/* 헤더 섹션 */}
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

        {/* 정보 카드 */}
        {generatedAt && (
          <div className="bg-gray-50 rounded-2xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-600">마지막 생성: {formatDate(generatedAt)}</span>
              </div>
              {nextGeneration && (
                <div className="flex items-center gap-2">
                  {/* <span className="text-sm text-gray-600">다음 생성 가능: {formatDate(nextGeneration)}</span> */}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 워드클라우드 그리드 */}
        {wordClouds.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wordClouds.map((wordCloud, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 border-2 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 ${getEmotionCardColor(wordCloud.emotion)}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">{wordCloud.emotion}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getEmotionColor(wordCloud.emotion)}`}
                  >
                    {wordCloud.emotion}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{wordCloud.emotion} 감정과 관련된 키워드들</p>

                <div
                  className="relative group cursor-pointer"
                  onClick={() => handleImageClick(wordCloud.url || "/placeholder.svg", wordCloud.emotion)}
                >
                  <img
                    src={wordCloud.url || "/placeholder.svg"}
                    alt={`${wordCloud.emotion} 워드클라우드`}
                    className="w-full h-96 object-contain bg-white rounded-xl transition-transform group-hover:scale-[1.02] shadow-inner"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=256&width=400"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
            <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-4" />
            <p className="text-blue-800 font-medium">
              아직 생성된 워드클라우드가 없습니다. 일기를 작성한 후 워드클라우드를 생성해보세요!
            </p>
          </div>
        )}

        {/* 빈 상태일 때 샘플 표시 */}
        {wordClouds.length === 0 && (
          <div className="text-center py-16 mt-8">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-900">워드클라우드를 생성해보세요</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                일기를 작성하면 감정별로 분석된
                <br />
                아름다운 워드클라우드가 생성됩니다
              </p>
              <button
                onClick={handleGenerateWordCloud}
                disabled={generating}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105 mx-auto disabled:opacity-50 disabled:transform-none"
              >
                <Sparkles className="h-4 w-4" />첫 워드클라우드 생성하기
              </button>
            </div>
          </div>
        )}

        {/* 이미지 확대 모달 */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={closeModal}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className={`rounded-2xl p-6 ${getEmotionCardColor(selectedImage.emotion)}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">{selectedImage.emotion}</h3>
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getEmotionColor(selectedImage.emotion)}`}
                  >
                    {selectedImage.emotion}
                  </span>
                </div>

                <div className="bg-white rounded-xl p-4">
                  <img
                    src={selectedImage.url || "/placeholder.svg"}
                    alt={`${selectedImage.emotion} 워드클라우드 확대`}
                    className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/placeholder.svg?height=400&width=600"
                    }}
                  />
                </div>

                <p className="text-center text-gray-600 mt-4">
                  {selectedImage.emotion} 감정과 관련된 키워드들을 워드클라우드로 표현했습니다
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}
