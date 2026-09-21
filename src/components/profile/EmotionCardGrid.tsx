"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"
import { EmotionCardGridError } from "./emotion-card-grid/EmotionCardGridError"
import { EmotionCardGridList } from "./emotion-card-grid/EmotionCardGridList"
import { EmotionCardGridLoading } from "./emotion-card-grid/EmotionCardGridLoading"
import { EmotionCardGridEmpty, EmotionCardGridPrivate } from "./emotion-card-grid/EmotionCardGridStates"
import { useEmotionCardGrid } from "./emotion-card-grid/useEmotionCardGrid"
import type { EmotionCardGridProps } from "./emotion-card-grid/types"

export default function EmotionCardGrid({ userId }: EmotionCardGridProps) {
  const { cards, loading, error, fetchEmotionCards } = useEmotionCardGrid(userId)

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
            <EmotionCardGridLoading />
          ) : error && error.includes("비공개") ? (
            <EmotionCardGridPrivate />
          ) : error ? (
            <EmotionCardGridError error={error} loading={loading} onRetry={fetchEmotionCards} />
          ) : cards.length === 0 ? (
            <EmotionCardGridEmpty userId={userId} />
          ) : (
            <EmotionCardGridList cards={cards} />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
