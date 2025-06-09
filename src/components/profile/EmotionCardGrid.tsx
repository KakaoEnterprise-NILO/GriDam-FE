"use client"

import { useEffect, useState } from "react"
import EmotionCard from "./EmotionCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Lock, RefreshCw } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import api from "@/api/axios"

interface EmotionCardData {
  id: string
  src: string
  label: string
  mood: string
  date: string
  hashtags?: string[]
}

interface EmotionCardGridProps {
  userId?: string // 조회할 사용자 ID (없으면 내 카드)
}

export default function EmotionCardGrid({ userId }: EmotionCardGridProps) {
  const [cards, setCards] = useState<EmotionCardData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchEmotionCards = async () => {
    try {
      setLoading(true)
      setError(null)

      if (userId) {
        // 다른 사용자의 감정 카드 조회
        console.log("🎨 다른 사용자의 감정 카드 조회:", userId)
        const res = await api.get("/emotion-cards", {
          params: {
            userId: userId,
            size: 9,
          },
        })

        console.log("📊 API 응답:", res.data)

        if (res.data.success) {
          // API 응답 구조 확인
          if (res.data.result) {
            let transformedCards: EmotionCardData[] = []

            // 응답이 배열인 경우 (cardInfoList)
            if (Array.isArray(res.data.result.cardInfoList)) {
              transformedCards = res.data.result.cardInfoList.map((card: any) => ({
                id: card.emotionCardId?.toString() || `card-${Math.random()}`,
                src: card.cardImageUrl || "/placeholder.svg?height=200&width=160",
                label: card.emotion || "감정",
                mood: card.emotions?.[0] ? Object.keys(card.emotions[0])[0] : "Neutral",
                date: new Date().toLocaleDateString("ko-KR"),
                hashtags: card.hashtags?.map((tag: any) => tag.tagName) || [],
              }))
            }
            // 응답이 단일 객체인 경우 (현재 응답 구조)
            else if (res.data.result.emotionCardId) {
              const card = res.data.result
              transformedCards = [
                {
                  id: card.emotionCardId?.toString() || `card-${Math.random()}`,
                  src: card.cardImageUrl || "/placeholder.svg?height=200&width=160",
                  label: card.emotion || "감정",
                  mood: card.emotions?.[0] ? Object.keys(card.emotions[0])[0] : "Neutral",
                  date: new Date().toLocaleDateString("ko-KR"),
                  hashtags: card.hashtags?.map((tag: any) => tag.tagName) || [],
                },
              ]
            }
            // 다른 구조의 응답인 경우 (임시 데이터)
            else {
              transformedCards = [
                {
                  id: "temp-1",
                  src: "/placeholder.svg?height=200&width=160",
                  label: "감정",
                  mood: "Neutral",
                  date: new Date().toLocaleDateString("ko-KR"),
                  hashtags: ["#태그"],
                },
              ]
            }

            console.log("✅ 변환된 카드:", transformedCards)
            setCards(transformedCards)
          } else {
            setCards([])
            console.log("❌ 결과 없음")
          }
        } else {
          setCards([])
          setError(res.data.message || "감정 카드를 불러올 수 없습니다.")
        }
      } else {
        // 내 감정 카드 조회
        console.log("🎨 내 감정 카드 조회")
        const res = await api.get("/emotion-cards", {
          params: {
            size: 9,
          },
        })

        console.log("📊 내 감정 카드 API 응답:", res.data)

        if (res.data.success) {
          // API 응답 구조 확인
          if (res.data.result) {
            let transformedCards: EmotionCardData[] = []

            // 응답이 배열인 경우 (cardInfoList)
            if (Array.isArray(res.data.result.cardInfoList)) {
              transformedCards = res.data.result.cardInfoList.map((card: any) => ({
                id: card.emotionCardId?.toString() || `card-${Math.random()}`,
                src: card.cardImageUrl || "/placeholder.svg?height=200&width=160",
                label: card.emotion || "감정",
                mood: card.emotions?.[0] ? Object.keys(card.emotions[0])[0] : "Neutral",
                date: new Date().toLocaleDateString("ko-KR"),
                hashtags: card.hashtags?.map((tag: any) => tag.tagName) || [],
              }))
            }
            // 응답이 단일 객체인 경우
            else if (res.data.result.emotionCardId) {
              const card = res.data.result
              transformedCards = [
                {
                  id: card.emotionCardId?.toString() || `card-${Math.random()}`,
                  src: card.cardImageUrl || "/placeholder.svg?height=200&width=160",
                  label: card.emotion || "감정",
                  mood: card.emotions?.[0] ? Object.keys(card.emotions[0])[0] : "Neutral",
                  date: new Date().toLocaleDateString("ko-KR"),
                  hashtags: card.hashtags?.map((tag: any) => tag.tagName) || [],
                },
              ]
            }

            console.log("✅ 변환된 내 카드:", transformedCards)
            setCards(transformedCards)
          } else {
            setCards([])
            console.log("❌ 내 감정 카드 결과 없음")
          }
        } else {
          setCards([])
          setError(res.data.message || "내 감정 카드를 불러올 수 없습니다.")
        }
      }
    } catch (err: any) {
      console.error("❌ 감정 카드 불러오기 실패:", err)
      setCards([])
      if (err.response?.status === 403) {
        setError("이 사용자의 감정 카드는 비공개로 설정되어 있습니다.")
      } else if (err.response?.status === 404) {
        setError("사용자를 찾을 수 없습니다.")
      } else {
        setError(err.response?.data?.message || err.message || "감정 카드를 불러오는 중 오류가 발생했습니다.")
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEmotionCards()
  }, [userId])

  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      ))}
    </div>
  )

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Sparkles className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {userId ? "감정 카드가 없습니다" : "아직 감정 카드가 없습니다"}
      </h3>
      <p className="text-muted-foreground max-w-sm">
        {userId ? "이 사용자는 아직 감정 카드를 작성하지 않았습니다." : "첫 번째 감정 카드를 작성해보세요."}
      </p>
    </div>
  )

  const PrivateState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Lock className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">비공개 감정 카드</h3>
      <p className="text-muted-foreground max-w-sm">이 사용자의 감정 카드는 비공개로 설정되어 있습니다.</p>
    </div>
  )

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert className="max-w-md">
        <AlertDescription className="text-center">{error}</AlertDescription>
      </Alert>
      <Button variant="outline" onClick={fetchEmotionCards} className="mt-4" disabled={loading}>
        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
        다시 시도
      </Button>
    </div>
  )

  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white p-0 py-0">
      <Card className="border-0 rounded-none">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">감정 하이라이트</h3>
              <p className="text-sm text-gray-600">
                {userId ? "사용자의 감정 기록을 확인해보세요" : "최근 기록된 감정들을 확인해보세요"}
              </p>
            </div>
            <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
              {cards.length}개
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {loading ? (
            <LoadingSkeleton />
          ) : error && error.includes("비공개") ? (
            <PrivateState />
          ) : error ? (
            <ErrorState />
          ) : cards.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <div
                  key={card.id}
                  className="animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EmotionCard {...card} />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
