"use client"

import type React from "react"

import { useCallback, useEffect, useState, useRef } from "react"
import "./UploadEmotionCard.css"
import refreshIcon from "../../assets/icons/refresh_button_icon.svg"
import defaultImg from "../../assets/picture/default_img.jpg"
import DownloadEmotionCard from "@/components/writingdiary/DownloadEmotionCard"
import { regenerateDiaryCard } from "@/services/regenerateDiaryCard"
import { getEmotionCardImage } from "@/services/emotionCardService"

interface UploadEmotionCardProps {
  onPreview: () => void
  diaryId: string
  diaryInfo: {
    title: string
    content: string
    imageFile?: File | null
  }
}

export default function UploadEmotionCard({ onPreview, diaryId, diaryInfo }: UploadEmotionCardProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [feedVisibility, setFeedVisibility] = useState("공개")
  const [shareScope, setShareScope] = useState("공개")
  const [progress, setProgress] = useState(80)
  const [error, setError] = useState<string | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const retryCount = useRef(0)
  const maxRetries = 10
  const timeoutsRef = useRef(new Set<ReturnType<typeof setTimeout>>())
  const requestGeneration = useRef(0)

  const fetchImage = useCallback(async () => {
    const generation = requestGeneration.current
    try {
      setError(null)

      const url = await getEmotionCardImage(diaryId)
      if (generation !== requestGeneration.current) return

      if (url) {
        setImageUrl(url)
        setLoading(false)
        retryCount.current = 0
      } else {
        throw new Error("Image URL not found in result")
      }
    } catch (err) {
      if (generation !== requestGeneration.current) return
      retryCount.current += 1
      console.warn(`⚠️ 이미지 로딩 실패 (${retryCount.current}/${maxRetries}):`, err)

      if (retryCount.current < maxRetries) {
        // 재시도 간격을 점진적으로 증가 (3초 → 5초 → 8초)
        const retryDelay = Math.min(3000 + retryCount.current * 2000, 8000)

        const timeout = setTimeout(() => {
          timeoutsRef.current.delete(timeout)
          fetchImage()
        }, retryDelay)
        timeoutsRef.current.add(timeout)
      } else {

        console.error("🛑 최대 재시도 도달. 기본 이미지로 대체:", err);
        setImageUrl("https://objectstorage.kr-central-2.kakaocloud.com/v1/e1aa923a4373419aace9daef92f80e91/image-storage/overlay/52b0a7b9-6698-4c73-b757-7cbebe409e80.jpg");
        setLoading(false)

        setImageUrl(defaultImg)
        setLoading(false)
        setError("이미지를 불러올 수 없습니다. 새로고침을 시도해보세요.")
      }
    }
  }, [diaryId])

  useEffect(() => {
    const timeouts = timeoutsRef.current
    if (diaryId) {
      setLoading(true)
      retryCount.current = 0

      // 약간의 지연 후 시작 (카드 생성 완료를 위한 버퍼)
      const timeout = setTimeout(() => {
        timeouts.delete(timeout)
        fetchImage()
      }, 1000)
      timeouts.add(timeout)
    }

    return () => {
      requestGeneration.current += 1
      timeouts.forEach(clearTimeout)
      timeouts.clear()
    }
  }, [diaryId, fetchImage])

  const handleRegenerate = async () => {
    const generation = requestGeneration.current
    const previousImage = imageUrl
    setLoading(true)
    setError(null)
    retryCount.current = 0

    try {

      const result = await regenerateDiaryCard({
        diaryId,
        title: diaryInfo.title,
        content: diaryInfo.content,
        imageFile: diaryInfo.imageFile,
      })

      if (generation !== requestGeneration.current) return

      if (result?.imageUrl) {
        setImageUrl(result.imageUrl)
      } else {
        throw new Error("재생성된 이미지 URL이 없습니다")
      }
    } catch (err) {
      if (generation !== requestGeneration.current) return
      console.error("❌ 재생성 실패:", err)
      setImageUrl(previousImage || defaultImg)
      setError("카드 재생성에 실패했습니다. 다시 시도해주세요.")
    } finally {
      if (generation === requestGeneration.current) setLoading(false)
    }
  }

  const handleManualRefresh = () => {
    setLoading(true)
    setError(null)
    retryCount.current = 0
    fetchImage()
  }

  const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const newProgress = Math.round((offsetX / rect.width) * 100)
    setProgress(Math.min(100, Math.max(0, newProgress)))
  }

  return (
    <div className="flex justify-center items-start min-h-screen p-0">
      <div className="bg-white w-[600px] p-8 rounded-2xl shadow-lg flex flex-col space-y-4 transition-all duration-500 relative">
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="icon-button" onClick={handleRegenerate} disabled={loading} title="카드 재생성">
            <img
              src={refreshIcon || "/placeholder.svg"}
              alt="재생성"
              className={`w-6 h-6 ${loading ? "animate-spin opacity-50" : ""}`}
            />
          </button>

          <button
            className="icon-button bg-blue-500 text-white rounded p-1"
            onClick={handleManualRefresh}
            disabled={loading}
            title="이미지 새로고침"
          >
            🔄
          </button>

          {imageUrl && imageUrl !== defaultImg && (
            <DownloadEmotionCard imageUrl={imageUrl} fileName={`emotion_card_${diaryId}.png`} />
          )}
        </div>


        <div className="flex justify-center">
          <div className="rounded-lg overflow-hidden shadow">
            {loading ? (

              <div className="w-64 h-64 bg-gray-300 animate-pulse flex flex-col items-center justify-center text-sm text-gray-500">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
                <div>감정 카드 생성 중...</div>
                <div className="text-xs mt-1">
                </div>
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl || "/placeholder.svg"}
                alt="감정 카드"
                className="block max-w-full h-auto rounded-lg shadow"
                onError={() => {
                  setImageUrl(defaultImg)
                  setError("이미지를 불러올 수 없습니다. 새로고침을 시도해보세요.")
                }}
              />
            ) : (
              <div className="w-64 h-64 bg-red-100 flex flex-col items-center justify-center text-sm text-red-500">
                <div>이미지 없음</div>
                <button
                  onClick={handleManualRefresh}
                  className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  다시 시도
                </button>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">{error}</div>
        )}

        <hr className="border-t border-gray-300 my-4" />

        <div>
          <p className="text-gray-600 mb-2 text-left">피드 생성 여부</p>
          <div className="flex justify-between space-x-6">
            {["공개", "비공개"].map((option) => (
              <label className="custom-radio" key={option}>
                <input
                  type="radio"
                  name="feedVisibility"
                  value={option}
                  checked={feedVisibility === option}
                  onChange={() => setFeedVisibility(option)}
                />
                <span className="custom-radio-btn"></span>
                <span className="text-gray-800 font-bold">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="text-gray-600 mb-2 text-left">공개 범위</p>
          <div className="flex justify-between space-x-6">
            {["공개", "요약 공개", "비공개"].map((scope) => (
              <label className="custom-radio" key={scope}>
                <input
                  type="radio"
                  name="shareScope"
                  value={scope}
                  checked={shareScope === scope}
                  onChange={() => setShareScope(scope)}
                />
                <span className="custom-radio-btn"></span>
                <span className="text-gray-800 font-bold">{scope}</span>
              </label>
            ))}
          </div>
        </div>

        <div
          className={`transition-all duration-500 overflow-hidden ${
            shareScope === "요약 공개" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mt-4 space-y-4">
            <p className="text-gray-600 mb-2 text-left">요약본</p>
            <p className="text-gray-700 text-sm mb-4">
              {diaryInfo.content.length > 50 ? `${diaryInfo.content.substring(0, 50)}...` : diaryInfo.content}
            </p>
            <div className="mt-2 flex items-center">
              <span className="font-bold text-blue-500">T</span>
              <div
                className="flex-1 mx-2 bg-gray-200 rounded-full h-3 relative cursor-pointer"
                ref={progressBarRef}
                onMouseDown={updateProgress}
                onMouseMove={(e) => e.buttons === 1 && updateProgress(e)}
              >
                <div
                  className="h-3 rounded-full absolute left-0 transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: `linear-gradient(to right, #4f83ff, #4caf50)`,
                  }}
                />
              </div>
              <span className="font-bold text-gray-700">F</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-12 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={onPreview}
            disabled={loading}
          >
            {loading ? "처리 중..." : "완료"}
          </button>
        </div>
      </div>
    </div>
  )
}
