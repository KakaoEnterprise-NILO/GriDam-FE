"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Trash2, ImageIcon, Clock } from "lucide-react"
import EmotionCard from "./EmotionCard"
import api from "../../api/axios"
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";

type EmotionCardDataType = {
  color: string
  emotion: string
  image: string
  date: string
  hashtags: string[]
  emotions: Array<{ [key: string]: number }>
  emotionCardId: number
}

type DiaryCardProps = {
  id: string
  title: string
  content: string
  date: string
  imageUrl: string
  hashtags: string[]
  onDelete: (diaryId: string) => void
}

// 감정별 색상 매핑 - 백엔드 Emotion enum에 맞춤
const emotionColorMap: { [key: string]: string } = {
  행복: "#FFD700", // HAPPY
  슬픔: "#4169E1", // SAD
  기쁨: "#FFA500", // JOY
  불안: "#9370DB", // ANXIOUS
  화남: "#DC143C", // ANGRY
  놀람: "#FF6347", // SURPRISE
  역겨움: "#696969", // DISGUST
  두려움: "#8B008B", // FEAR
  없음: "#CCCCCC", // NONE
  default: "#CCCCCC",
}

export default function DiaryCard({ id, title, content, date, imageUrl, hashtags, onDelete }: DiaryCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [emotionCardData, setEmotionCardData] = useState<EmotionCardDataType | null>(null)
  const [loadingCard, setLoadingCard] = useState(false)
  const [emotion, setEmotion] = useState("")
  const [, setCardImageUrl] = useState("")
  const [loadingEmotion, setLoadingEmotion] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [emotionCardExists, setEmotionCardExists] = useState<boolean | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchEmotionInfo = async () => {
      try {
        setLoadingEmotion(true)
        const res = await api.get(`/emotion-cards/card-image`, {
          params: { diaryId: id },
        })


        if (res.data.success && res.data.result) {
          const { emotion, cardImageUrl } = res.data.result
          setEmotion(emotion)
          setCardImageUrl(cardImageUrl)
          setEmotionCardExists(true)
        } else {
          throw new Error(res.data.message || "감정 정보를 불러올 수 없습니다.")
        }
      } catch (err: unknown) {
        const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
        console.error("감정 정보 조회 실패:", err)

        if (errorResponse?.data?.code === "EMOTIONCARD4001" || errorResponse?.status === 404) {
          setEmotionCardExists(false)
          setEmotion("")
          setCardImageUrl("")
        } else {
          // 다른 에러의 경우 null로 설정 (알 수 없는 상태)
          setEmotionCardExists(null)
          setEmotion("")
        }
      } finally {
        setLoadingEmotion(false)
      }
    }

    fetchEmotionInfo()
  }, [id])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const fetchEmotionCard = async () => {
    try {
      setLoadingCard(true)

      const res = await api.get(`/emotion-cards/card-image`, {
        params: { diaryId: id },
      })


      if (res.data.success && res.data.result) {
        const { cardImageUrl, emotion, emotions, emotionCardId, hashtags } = res.data.result
        const color = emotionColorMap[emotion] || emotionColorMap.default


        setEmotion(emotion)
        setCardImageUrl(cardImageUrl)
        setEmotionCardExists(true)

        // hashtags 처리: API에서 받은 hashtags가 있으면 사용하고, 없으면 기존 hashtags 사용
        const processedHashtags =
          hashtags && hashtags.length > 0 ? hashtags.map((tag: { tagName: string }) => tag.tagName) : hashtags

        setEmotionCardData({
          color,
          emotion,
          image: cardImageUrl,
          date,
          hashtags: processedHashtags,
          emotions, // 원본 API 응답 데이터를 그대로 전달
          emotionCardId,
        })
        setShowModal(true)
      } else {
        throw new Error(res.data.message || "감정카드 조회에 실패했습니다.")
      }
    } catch (err: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
      const errorMessage = err instanceof Error ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
          ? err.message : undefined
      console.error("감정카드 조회 실패", err)

      if (errorResponse?.data?.code === "EMOTIONCARD4001" || errorResponse?.status === 404) {
        setEmotionCardExists(false)
        alert("아직 감정카드가 생성되지 않았습니다. 잠시 후 다시 시도해주세요.")
      } else if (errorResponse?.status === 401) {
        alert("로그인이 필요합니다.")
      } else {
        alert(errorResponse?.data?.message || errorMessage || "감정카드를 불러오는데 실패했습니다.")
      }
    } finally {
      setLoadingCard(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm("정말로 이 일기를 삭제하시겠습니까?")) {
      setShowMenu(false)

      try {
        const response = await api.delete(`/diary/${id}`)

        if (response.data.success) {
          alert("일기가 성공적으로 삭제되었습니다.")
          await onDelete(id)
        } else {
          throw new Error(response.data.message || "일기 삭제에 실패했습니다.")
        }
      } catch (err: unknown) {
        const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
        console.error("일기 삭제 실패:", err)

        if (errorResponse?.status === 401) {
          alert("로그인이 필요합니다.")
        } else if (errorResponse?.status === 404) {
          alert("삭제하려는 일기를 찾을 수 없습니다.")
        } else if (errorResponse?.status === 500) {
          const errorCode = errorResponse?.data?.code
          if (errorCode === "COMMON500") {
            alert("서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
            console.error("서버 오류 상세:", errorResponse?.data?.result)
          } else {
            alert("서버 오류가 발생했습니다. 관리자에게 문의해주세요.")
          }
        } else {
          alert(errorResponse?.data?.message || "일기 삭제에 실패했습니다.")
        }
      }
    }
  }

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true)
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  const getEmotionColor = () => {
    if (loadingEmotion) return "#CCCCCC"
    if (emotionCardExists === false) return "#E5E7EB" // 회색 (감정카드 없음)
    if (emotion) return emotionColorMap[emotion] || emotionColorMap.default
    return "#CCCCCC"
  }

  const getEmotionButtonText = () => {
    if (loadingCard) return "로딩 중..."
    if (loadingEmotion) return "분석 중..."
    if (emotionCardExists === false) return "감정 분석 중"
    return "감정카드 보기"
  }

  const isEmotionButtonDisabled = () => {
    return loadingCard || loadingEmotion || emotionCardExists === false
  }

  const color = getEmotionColor()

  return (
    <>
      <div className="bg-white rounded-xl shadow overflow-hidden relative">
        <div className="absolute top-2 right-2" ref={menuRef}>
          <MoreVertical
            size={20}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => setShowMenu(!showMenu)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
              <button
                className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full text-red-600"
                onClick={handleDelete}
              >
                <Trash2 size={16} />
                삭제
              </button>
            </div>
          )}
        </div>

        <div
          className="flex justify-between p-4 pt-8 cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold">{title}</h2>
              <p className="text-sm text-gray-500 font-semibold whitespace-nowrap">· {date}</p>
              {emotion && emotionCardExists === true && (
                <span
                  className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                  style={{ backgroundColor: color }}
                >
                  {emotion}
                </span>
              )}
              {emotionCardExists === false && (
                <span className="text-xs px-2 py-1 rounded-full bg-gray-200 text-gray-600 font-semibold flex items-center gap-1">
                  <Clock size={10} />
                  분석 중
                </span>
              )}
            </div>
            <p
              className={`text-sm text-gray-400 mt-1 w-[70%] whitespace-pre-line transition-all duration-300 ${
                isExpanded ? "" : "line-clamp-2"
              }`}
            >
              {content}
            </p>
          </div>
          <div className="flex-shrink-0 ml-auto mr-[5%]">
            {imageUrl ? (
              imageError ? (
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md">
                  <ImageIcon className="text-gray-400" size={32} />
                </div>
              ) : (
                <>
                  {!imageLoaded && (
                    <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-md flex items-center justify-center">
                      <div className="text-gray-400">
                        <ImageIcon size={24} />
                      </div>
                    </div>
                  )}
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="diary"
                    className={`w-24 h-24 object-cover rounded-md transition-opacity duration-300 ${
                      imageLoaded ? "opacity-100" : "opacity-0"
                    }`}
                    onError={handleImageError}
                    onLoad={handleImageLoad}
                  />
                </>
              )
            ) : null}
          </div>
        </div>

        <div
          className="flex justify-between items-center text-white px-4 py-2 transition-colors duration-300"
          style={{ backgroundColor: color }}
        >
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag) => (
                <span key={tag} className="text-sm font-semibold">
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}
          <button
            className={`flex-shrink-0 ml-auto mr-[5%] text-sm font-semibold transition-all duration-200 ${
              isEmotionButtonDisabled() ? "opacity-50 cursor-not-allowed" : "hover:underline hover:scale-105"
            }`}
            onClick={fetchEmotionCard}
            disabled={isEmotionButtonDisabled()}
          >
            {getEmotionButtonText()}
          </button>
        </div>
      </div>

      {showModal && emotionCardData && (
        <EmotionCard
          front={{
            color: emotionCardData.color,
            emotion: emotionCardData.emotion,
            image: emotionCardData.image,
          }}
          back={{
            color: emotionCardData.color,
            date: emotionCardData.date,
            hashtags: emotionCardData.hashtags,
            emotions: emotionCardData.emotions, // API 응답 데이터를 그대로 전달
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
