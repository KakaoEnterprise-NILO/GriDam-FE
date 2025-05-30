"use client"

import { useEffect, useState, useCallback } from "react"
import UserProfileCard from "@/components/profile/UserProfileCard"
import EmotionCardGrid from "@/components/profile/EmotionCardGrid"
import FollowingList from "@/components/profile/FollowingList"
import FollowersList from "@/components/profile/FollowersList"  
import MainLayout from "@/components/common/MainLayout"
import ProfileEditModal from "@/components/profile/ProfileEditModal"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import api from "@/api/axios"

interface UserInfo {
  userId: string
  profileImgUrl: string
  userName: string
  introduction: string
  followerCount: number
  followingCount: number
  diaryCount: number
}

type ActiveTab = "emotion" | "following" | "followers"

export default function MyProfile() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("emotion")
  const [isLoading, setIsLoading] = useState(true)

  const fetchUserInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/users/profile")
      console.log("✅ 받아온 유저 정보:", response.data.result)
      setUserInfo(response.data.result)
    } catch (error) {
      console.error("❌ 유저 정보 불러오기 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUserInfo()
  }, [fetchUserInfo])

  const handleProfileUpdated = async () => {
    await fetchUserInfo()
    setIsEditModalOpen(false)
  }

  const handleFollowingClick = () => {
    setActiveTab("following")
  }

  const handleFollowersClick = () => {
    setActiveTab("followers")
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-8 items-start">
          {/* 왼쪽 - 유저 프로필 카드 */}
          <div className="w-full">
            {isLoading ? (
              <Card className="w-full border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Skeleton className="h-32 w-full rounded-lg" />
                    <div className="flex justify-center">
                      <Skeleton className="h-32 w-32 rounded-full" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mx-auto" />
                    <Skeleton className="h-4 w-1/2 mx-auto" />
                    <div className="flex gap-4">
                      <Skeleton className="h-16 flex-1 rounded-lg" />
                      <Skeleton className="h-16 flex-1 rounded-lg" />
                    </div>
                    <Skeleton className="h-12 w-full rounded-lg" />
                  </div>
                </CardContent>
              </Card>
            ) : userInfo ? (
              <UserProfileCard
                username={userInfo.userName}
                introduction={userInfo.introduction || `일기 ${userInfo.diaryCount}개 작성`}
                followers={userInfo.followerCount}
                following={userInfo.followingCount}
                profileImgUrl={userInfo.profileImgUrl}
                isMyProfile={true}
                onEditProfile={() => setIsEditModalOpen(true)}
                onFollowingClick={handleFollowingClick}
                onFollowersClick={handleFollowersClick}
              />
            ) : (
              <Card className="w-full border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">프로필 정보를 불러올 수 없습니다.</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* 오른쪽 - 감정 카드, 팔로잉 목록, 팔로워 목록 */}
          <div className="w-full">
            {activeTab === "emotion" && <EmotionCardGrid />}
            {activeTab === "following" && <FollowingList />}
            {activeTab === "followers" && <FollowersList />}
          </div>
        </div>

        {/* 프로필 편집 모달 */}
        {userInfo && (
          <ProfileEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            currentUsername={userInfo.userName}
            currentProfileImg={userInfo.profileImgUrl}
            onSuccess={handleProfileUpdated}
          />
        )}
      </div>
    </MainLayout>
  )
}
