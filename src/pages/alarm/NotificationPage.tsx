import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/Topbar";
import NotificationList from "@/components/alarm/NotificationCardList";
import RecentNotificationList from "@/components/alarm/RecentNotificationList";
import EmotionCardPost from "@/components/feed/EmotionCardPost";

export default function NotificationPage() {
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] flex p-4 md:p-6 overflow-hidden">
      {/* 블러 처리 */}
      {isBlurred && (
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300" />
      )}

      {/* Sidebar */}
      <div
        className={`mr-4 md:mr-8 mt-4 flex-shrink-0 z-20 transition-all duration-300 ${
          isBlurred ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Sidebar activePage="alerts" />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col z-20 transition-all duration-300 ${
          isBlurred ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* TopBar */}
        <div className="mb-4">
          <TopBar />
        </div>

        {/* 가운데 정렬된 본문 콘텐츠 */}
        <div className="flex justify-center">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 px-4 py-4 w-full max-w-[72rem]">
            {/* 알림 영역 */}
            <div className="flex flex-col gap-4 w-full lg:w-[28rem]">
              <NotificationList />
              <RecentNotificationList />
            </div>

            {/* 우측: 감정 카드 (게시물) */}
            <div className="w-full flex-1">
              <EmotionCardPost />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
