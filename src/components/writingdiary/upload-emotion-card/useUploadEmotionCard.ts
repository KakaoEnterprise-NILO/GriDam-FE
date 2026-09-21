import type { MouseEvent } from "react"
import { useCallback, useEffect, useState, useRef } from "react"
import defaultImg from "@/assets/picture/default_img.jpg"
import { regenerateDiaryCard } from "@/services/regenerateDiaryCard"
import { getEmotionCardImage } from "@/services/emotionCardService"
import { IMAGE_LOAD_ERROR, MAX_IMAGE_RETRIES } from "./constants"
import type { UploadEmotionCardProps } from "./types"

export function useUploadEmotionCard(
  diaryId: string,
  diaryInfo: UploadEmotionCardProps["diaryInfo"]
) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [feedVisibility, setFeedVisibility] = useState("공개")
  const [shareScope, setShareScope] = useState("공개")
  const [progress, setProgress] = useState(80)
  const [error, setError] = useState<string | null>(null)
  const progressBarRef = useRef<HTMLDivElement | null>(null)
  const retryCount = useRef(0)
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
      console.warn(
        `⚠️ 이미지 로딩 실패 (${retryCount.current}/${MAX_IMAGE_RETRIES}):`,
        err
      )

      if (retryCount.current < MAX_IMAGE_RETRIES) {
        // 재시도 간격을 점진적으로 증가 (3초 → 5초 → 8초)
        const retryDelay = Math.min(3000 + retryCount.current * 2000, 8000)

        const timeout = setTimeout(() => {
          timeoutsRef.current.delete(timeout)
          fetchImage()
        }, retryDelay)
        timeoutsRef.current.add(timeout)
      } else {
        console.error("🛑 최대 재시도 도달. 기본 이미지로 대체:", err)
        setImageUrl(defaultImg)
        setLoading(false)
        setError(IMAGE_LOAD_ERROR)
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
        imageFile: diaryInfo.imageFile
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

  const updateProgress = (e: MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return
    const rect = progressBarRef.current.getBoundingClientRect()
    const offsetX = e.clientX - rect.left
    const newProgress = Math.round((offsetX / rect.width) * 100)
    setProgress(Math.min(100, Math.max(0, newProgress)))
  }

  const handleImageError = () => {
    setImageUrl(defaultImg)
    setError(IMAGE_LOAD_ERROR)
  }

  const summary =
    diaryInfo.content.length > 50
      ? diaryInfo.content.substring(0, 50) + "..."
      : diaryInfo.content

  return {
    imageUrl,
    loading,
    error,
    feedVisibility,
    setFeedVisibility,
    shareScope,
    setShareScope,
    progress,
    progressBarRef,
    summary,
    handleRegenerate,
    handleManualRefresh,
    handleImageError,
    updateProgress
  }
}
