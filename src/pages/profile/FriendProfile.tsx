import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import TopBar from "@/components/common/Topbar";
import UserProfileCard from "@/components/profile/UserProfileCard";
import EmotionCardGrid from "@/components/profile/EmotionCardGrid";

export default function FriendProfile() {
  const [isFollowing, setIsFollowing] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] flex p-6 overflow-hidden">
      {/* Sidebar */}
      <div className="mr-8 mt-4 flex-shrink-0 z-20">
        <Sidebar activePage="friend" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col z-20">
        <div className="mb-4">
          <TopBar />
        </div>

        <div className="flex-1 flex px-8 py-6 gap-8">
          {/* 친구 프로필 카드 */}
          <div className="w-[250px]">
            <UserProfileCard
              username="Life_is_good"
              bio="Hi~There~!"
              followers={100}
              following={120}
              isFollowing={isFollowing}
              isMyProfile={false}
              onFollowToggle={() => setIsFollowing((prev) => !prev)}
            />
          </div>

          {/* 감정 카드 */}
          <div className="flex-1">
            <EmotionCardGrid />
          </div>
        </div>
      </div>
    </div>
  );
}
