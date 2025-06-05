"use client"
import type React from "react"
import { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import { PieChart, Pie, Cell } from "recharts"
import { X, BarChart3, Sparkles, ImageIcon, Expand } from "lucide-react"

type EmotionCardProps = {
  front: {
    color: string
    emotion: string
    image: string
  }
  back: {
    color: string
    date: string
    hashtags: string[]
    chartData: { name: string; value: number }[]
  }
  onClose?: () => void
}

const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"]

export default function EmotionCard({ front, back, onClose }: EmotionCardProps) {
  const [flipped, setFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [showFullscreenImage, setShowFullscreenImage] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [])

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true)
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const handleExpandImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setShowFullscreenImage(true)
  }

  const handleCloseFullscreen = () => {
    setShowFullscreenImage(false)
  }

  // 전체화면 이미지 뷰어 컴포넌트
  const FullscreenImageViewer = () => (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4">
      <button
        onClick={handleCloseFullscreen}
        className="absolute top-4 right-4 p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-200 shadow-lg z-10"
      >
        <X size={24} />
      </button>

      {/* 이미지 컨테이너 - 감정 라벨을 위한 공간 확보 */}
      <div className="flex-1 flex items-center justify-center w-full max-h-[calc(100vh-120px)]">
        {imageError || !front.image ? (
          <div className="flex flex-col items-center justify-center text-white">
            <ImageIcon size={80} className="mb-4 opacity-50" />
            <p className="text-lg">이미지를 불러올 수 없습니다</p>
          </div>
        ) : (
          <img
            src={front.image || "/placeholder.svg"}
            alt="emotion card full size"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
            onError={handleImageError}
          />
        )}
      </div>

      {/* 감정 정보 오버레이 - 고정 위치 */}
      <div className="flex-shrink-0 py-6">
        <div
          className="flex items-center gap-3 px-8 py-4 rounded-full text-white font-bold text-xl shadow-2xl backdrop-blur-sm border border-white/20"
          style={{
            background: `linear-gradient(135deg, ${front.color}, ${front.color}dd)`,
            boxShadow: `0 12px 40px ${front.color}60`,
          }}
        >
          <Sparkles size={22} />
          {front.emotion}
        </div>
      </div>

      {/* 안내 텍스트 */}
      <div className="flex-shrink-0 pb-4">
        <p className="text-white/70 text-sm text-center">화면을 터치하거나 ESC 키를 눌러 닫기</p>
      </div>
    </div>
  )

  // ESC 키로 전체화면 닫기
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showFullscreenImage) {
        setShowFullscreenImage(false)
      }
    }

    if (showFullscreenImage) {
      document.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [showFullscreenImage])

  const modalContent = (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
        <div
          className="w-[380px] h-[620px] relative cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          style={{ perspective: "1500px" }}
        >
          <div
            className="relative w-full h-full transition-transform duration-700 ease-in-out"
            style={{
              transformStyle: "preserve-3d",
              transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* 앞면 */}
            <div
              className="absolute w-full h-full rounded-2xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 overflow-hidden"
              style={{ backfaceVisibility: "hidden" }}
            >
              {/* 배경 장식 */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-100/50 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100/50 to-transparent rounded-tr-full"></div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onClose) onClose()
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 h-full flex flex-col">
                {/* 감정 라벨 */}
                <div className="text-center mb-6">
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${front.color}, ${front.color}dd)`,
                      boxShadow: `0 8px 32px ${front.color}40`,
                    }}
                  >
                    <Sparkles size={18} />
                    {front.emotion}
                  </div>
                </div>

                {/* 이미지 - 에러 처리 개선 */}
                <div className="flex-1 relative mb-4 max-h-[300px]">
                  <div className="w-full h-full rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200 bg-gray-100 relative">
                    {imageError || !front.image ? (
                      // 이미지 로드 실패 시 아이콘으로 대체
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
                        <ImageIcon size={64} className="mb-4" />
                        <p className="text-sm font-medium">이미지를 불러올 수 없습니다</p>
                      </div>
                    ) : (
                      <>
                        {!imageLoaded && (
                          // 로딩 중 스켈레톤
                          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse flex items-center justify-center">
                            <div className="text-gray-400">
                              <ImageIcon size={48} />
                            </div>
                          </div>
                        )}
                        <img
                          src={front.image || "/placeholder.svg"}
                          alt="emotion card"
                          className={`w-full h-full object-cover object-center transition-opacity duration-300 ${
                            imageLoaded ? "opacity-100" : "opacity-0"
                          }`}
                          style={{
                            minHeight: "250px",
                            maxHeight: "300px",
                          }}
                          onError={handleImageError}
                          onLoad={handleImageLoad}
                        />
                        {/* 이미지 오버레이 */}
                        {imageLoaded && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                        )}
                      </>
                    )}

                    {/* 확대 버튼 */}
                    {imageLoaded && !imageError && front.image && (
                      <button
                        onClick={handleExpandImage}
                        className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-all duration-200 shadow-lg group"
                        title="이미지 확대"
                      >
                        <Expand size={16} className="group-hover:scale-110 transition-transform" />
                      </button>
                    )}
                  </div>
                </div>

                {/* 해시태그 */}
                <div className="text-center mb-4">
                  <div className="flex flex-wrap justify-center gap-2">
                    {back.hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium border border-gray-200"
                      >
                        #{tag.replace(/^#/, "")}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 안내 텍스트 */}
                <div className="text-center">
                  <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></span>
                    카드를 터치하여 분석 결과 보기
                    <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></span>
                  </p>
                </div>
              </div>
            </div>

            {/* 뒷면 */}
            <div
              className="absolute w-full h-full rounded-2xl shadow-2xl bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              {/* 배경 패턴 */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-300 rounded-full"></div>
                <div className="absolute top-32 right-16 w-16 h-16 border-2 border-blue-300 rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 border-2 border-pink-300 rounded-full"></div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  if (onClose) onClose()
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 backdrop-blur-sm text-gray-600 hover:text-gray-800 hover:bg-white transition-all duration-200 shadow-lg z-10"
              >
                <X size={20} />
              </button>

              <div className="p-8 h-full flex flex-col">
                {/* 감정 라벨 */}
                <div className="text-center mb-6">
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold text-lg shadow-lg"
                    style={{
                      background: `linear-gradient(135deg, ${back.color}, ${back.color}dd)`,
                      boxShadow: `0 8px 32px ${back.color}40`,
                    }}
                  >
                    <BarChart3 size={18} />
                    {front.emotion} 분석
                  </div>
                </div>

                {/* 차트 영역 */}
                <div className="flex-1 flex flex-col items-center justify-center">
                  <div className="bg-white rounded-xl p-4 shadow-lg ring-1 ring-gray-100 w-full">
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-4 flex items-center justify-center gap-2">
                      <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                      감정 구성 비율
                      <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    </h3>
                    <div className="flex justify-center">
                      <PieChart width={320} height={240}>
                        <Pie
                          data={back.chartData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          outerRadius={70}
                          innerRadius={25}
                          label={({ name, value }) => `${name} ${value}%`}
                          labelLine={false}
                          stroke="#ffffff"
                          strokeWidth={2}
                        >
                          {back.chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                  </div>
                </div>

                {/* 하단 정보 */}
                <div className="space-y-4">
                  {/* 해시태그 */}
                  <div className="text-center">
                    <div className="flex flex-wrap justify-center gap-2">
                      {back.hashtags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm"
                        >
                          #{tag.replace(/^#/, "")}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 안내 텍스트 */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
                      <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse"></span>
                      카드를 터치하여 돌아가기
                      <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"></span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 전체화면 이미지 뷰어 */}
      {showFullscreenImage && <FullscreenImageViewer />}
    </>
  )

  return ReactDOM.createPortal(modalContent, document.body)
}
