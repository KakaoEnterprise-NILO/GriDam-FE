"use client"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Trash2, ImageIcon } from "lucide-react"
import EmotionCard from "./EmotionCard"
import api from "../../api/axios" // 커스텀 axios 인스턴스 사용

type EmotionCardDataType = {
  color: string
  emotion: string
  image: string
  date: string
  hashtags: string[]
  chartData: { name: string; value: number }[]
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
  행복: "#FFD700",    // HAPPY
  슬픔: "#4169E1",    // SAD  
  기쁨: "#FFA500",    // JOY
  불안: "#9370DB",    // ANXIOUS
  화남: "#DC143C",    // ANGRY
  놀람: "#FF6347",    // SURPRISE
  역겨움: "#696969",  // DISGUST
  두려움: "#8B008B",  // FEAR
  없음: "#CCCCCC",    // NONE
  // 기본값
  default: "#CCCCCC",
}

export default function DiaryCard({ id, title, content, date, imageUrl, hashtags, onDelete }: DiaryCardProps) {
  const [showModal, setShowModal] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [emotionCardData, setEmotionCardData] = useState<EmotionCardDataType | null>(null)
  const [loadingCard, setLoadingCard] = useState(false)
  const [emotion, setEmotion] = useState("")
  const [cardImageUrl, setCardImageUrl] = useState("")
  const [loadingEmotion, setLoadingEmotion] = useState(true)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 컴포넌트 마운트 시 감정 정보 미리 가져오기
  useEffect(() => {
    const fetchEmotionInfo = async () => {
      try {
        setLoadingEmotion(true)
        const res = await api.get(`/emotion-cards/card-image`, {
          params: { diaryId: id },
        })

        if (res.data.success) {
          const { emotion, cardImageUrl } = res.data.result
          setEmotion(emotion)
          setCardImageUrl(cardImageUrl)
        }
      } catch (err) {
        console.error("감정 정보 조회 실패:", err)
        // 에러가 발생해도 기본 색상으로 표시
        setEmotion("")
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

      // 이미 감정 정보가 있다면 바로 모달 표시
      if (emotion && cardImageUrl) {
        const color = emotionColorMap[emotion] || emotionColorMap.default

        setEmotionCardData({
          color,
          emotion,
          image: cardImageUrl,
          date,
          hashtags,
          chartData: [
            { name: "기쁨", value: 30 },
            { name: "슬픔", value: 25 },
            { name: "분노", value: 20 },
            { name: "불안", value: 15 },
            { name: "평온", value: 10 },
          ],
        })
        setShowModal(true)
        return
      }

      // 감정 정보가 없다면 다시 API 호출
      const res = await api.get(`/emotion-cards/card-image`, {
        params: { diaryId: id },
      })

      if (res.data.success) {
        const { cardImageUrl, emotion } = res.data.result
        const color = emotionColorMap[emotion] || emotionColorMap.default

        setEmotion(emotion)
        setCardImageUrl(cardImageUrl)
        setEmotionCardData({
          color,
          emotion,
          image: cardImageUrl,
          date,
          hashtags,
          chartData: [
            { name: "기쁨", value: 30 },
            { name: "슬픔", value: 25 },
            { name: "분노", value: 20 },
            { name: "불안", value: 15 },
            { name: "평온", value: 10 },
          ],
        })
        setShowModal(true)
      } else {
        throw new Error(res.data.message || "감정카드 조회에 실패했습니다.")
      }
    } catch (err: any) {
      console.error("감정카드 조회 실패", err)

      if (err.response?.status === 401) {
        alert("로그인이 필요합니다.")
      } else {
        alert(err.response?.data?.message || err.message || "감정카드를 불러오는데 실패했습니다.")
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
      } catch (err: any) {
        console.error("일기 삭제 실패:", err)

        if (err.response?.status === 401) {
          alert("로그인이 필요합니다.")
        } else if (err.response?.status === 404) {
          alert("삭제하려는 일기를 찾을 수 없습니다.")
        } else if (err.response?.status === 500) {
          // 서버 내부 오류 처리
          const errorCode = err.response?.data?.code
          if (errorCode === "COMMON500") {
            alert("서버에서 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
            console.error("서버 오류 상세:", err.response?.data?.result)
          } else {
            alert("서버 오류가 발생했습니다. 관리자에게 문의해주세요.")
          }
        } else {
          alert(err.response?.data?.message || "일기 삭제에 실패했습니다.")
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

  const color = emotionColorMap[emotion] || emotionColorMap.default

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
              {/* 감정 표시 */}
              {emotion && (
                <span
                  className="text-xs px-2 py-1 rounded-full text-white font-semibold"
                  style={{ backgroundColor: color }}
                >
                  {emotion}
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
                // 이미지 로드 실패 시 아이콘으로 대체
                <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-md">
                  <ImageIcon className="text-gray-400" size={32} />
                </div>
              ) : (
                <>
                  {!imageLoaded && (
                    // 로딩 중 스켈레톤
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
          style={{ backgroundColor: loadingEmotion ? "#CCCCCC" : color }}
        >
          {/* 해시태그 표시 영역 */}
          {hashtags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <span key={index} className="text-sm font-semibold">
                  #{tag.replace(/^#/, "")}
                </span>
              ))}
            </div>
          )}
          <button
            className="flex-shrink-0 ml-auto mr-[5%] text-sm font-semibold hover:underline disabled:opacity-50"
            onClick={fetchEmotionCard}
            disabled={loadingCard}
          >
            {loadingCard ? "로딩 중..." : "감정카드 보기"}
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
            chartData: emotionCardData.chartData,
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
