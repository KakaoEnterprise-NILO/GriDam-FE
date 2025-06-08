"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import MainLayout from "@/components/common/MainLayout"
import EmotionCardPost from "@/components/feed/EmotionCardPost"

export default function FriendList() {
  const [isBlurred] = useState(false) // 블러 처리용 상태 (추후 모달 등에 활용)
  const [cards, setCards] = useState<number[]>(Array.from({ length: 6 }, (_, i) => i))
  const [, setPage] = useState(1)
  const observerRef = useRef<null | HTMLDivElement>(null)

  const loadMore = useCallback(() => {
    setCards((prev) => [
      ...prev,
      ...Array.from({ length: 6 }, (_, i) => prev.length + i),
    ])
    setPage((prev) => prev + 1)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { threshold: 1 }
    )

    const current = observerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loadMore])

  return (
    <MainLayout>
      {/* 블러 효과 (모달 대응 등 추후 활용 시) */}
      {isBlurred && (
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300" />
      )}

      <div
        className={`relative z-20 transition-all duration-300 ${
          isBlurred ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-1 justify-center items-start overflow-y-auto px-6 py-6">
          <div className="w-full max-w-2xl space-y-6">
            {cards.map((id) => (
              <EmotionCardPost key={id} feedId={id} /> // 수정 완료
            ))}
            {/* 관찰 대상 div (무한 스크롤용) */}
            <div ref={observerRef} className="h-10" />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
