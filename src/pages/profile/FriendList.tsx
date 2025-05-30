import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/Topbar";
import UserProfileCard from "@/components/profile/UserProfileCard";
import FollowingList from "@/components/profile/FollowingList";

export default function FriendList() {
  const [isBlurred, setIsBlurred] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] flex p-6 overflow-hidden">
      {/* 블러 처리 */}
      {isBlurred && (
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300" />
      )}

      {/* Sidebar */}
      <div
        className={`mr-8 mt-4 flex-shrink-0 z-20 transition-all duration-300 ${
          isBlurred ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Sidebar activePage="friends" />
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

        {/* 본문 */}
        <div className="flex flex-row px-8 py-6 gap-8">
          {/* 내 프로필 카드 */}
          <div className="w-[250px]">
            <UserProfileCard
              username="Life_is_good"
              bio="Hi~There~!"
              followers={100}
              following={120}
              isMyProfile={true}
            />
          </div>

          {/* 팔로잉 유저 목록 */}
          <div className="flex-1">
            <FollowingList />
          </div>
        </div>
      </div>
    </div>
  );
}