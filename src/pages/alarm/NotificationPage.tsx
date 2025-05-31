"use client"

import { useState } from "react"
import NotificationList from "@/components/alarm/NotificationCardList"
import RecentNotificationList from "@/components/alarm/RecentNotificationList"
import EmotionCardPost from "@/components/feed/EmotionCardPost"
import MainLayout from "@/components/common/MainLayout"
export default function NotificationPage() {
  const [isBlurred, setIsBlurred] = useState(false)

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br  via-white to-indigo-50">
        {/* 블러 처리 */}
        {isBlurred && (
          <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300" />
        )}

        {/* 메인 콘텐츠 */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* 페이지 헤더 */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">알림</h1>
            <p className="text-gray-600">새로운 소식과 최근 활동을 확인하세요</p>
          </div>

          {/* 콘텐츠 그리드 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 알림 영역 */}
            <div className="lg:col-span-2 space-y-6">
              <NotificationList />
              <RecentNotificationList />
            </div>

            {/* 우측: 감정 카드 (게시물)
            <div className="lg:col-span-1">
              <div className="sticky top-6">
                <EmotionCardPost />
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </MainLayout>
    
  )
}
