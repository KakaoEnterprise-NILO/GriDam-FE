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
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
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
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfo | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("emotion")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSelectedUser, setIsLoadingSelectedUser] = useState(false)

  const fetchUserInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await api.get("/users/profile")
      setUserInfo(response.data.result)
    } catch (error) {
      console.error("❌ 유저 정보 불러오기 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSelectedUserInfo = async (userId: string) => {
    try {
      setIsLoadingSelectedUser(true)
      const response = await api.get(`/users/profile/${userId}`)
      setSelectedUserInfo(response.data.result)
    } catch (error) {
      console.error("선택한 유저 정보 불러오기 실패:", error)
      alert("사용자 정보를 불러오는데 실패했습니다.")
    } finally {
      setIsLoadingSelectedUser(false)
    }
  }

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

  const handleUserSelect = (userId: string) => {
    fetchSelectedUserInfo(userId)
    setActiveTab("emotion") // 사용자 선택 시 감정 탭으로 전환
  }

  const handleBackToMyProfile = () => {
    setSelectedUserInfo(null)
    setActiveTab("emotion") // 내 프로필로 돌아갈 때도 감정 탭으로 전환
  }

  // 현재 보고 있는 사용자 정보 (본인 또는 선택된 사용자)
  const currentViewingUser = selectedUserInfo || userInfo
  const isViewingMyProfile = !selectedUserInfo

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {selectedUserInfo && (
          <div className="flex items-center mb-4">
            <Button variant="ghost" onClick={handleBackToMyProfile} className="flex items-center text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />내 프로필로 돌아가기
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-8 items-start">
          <div className="w-full">
            {isLoading && !selectedUserInfo ? (
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
            ) : isLoadingSelectedUser ? (
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
            ) : currentViewingUser ? (
              <UserProfileCard
                username={currentViewingUser.userName}
                introduction={currentViewingUser.introduction || `일기 ${currentViewingUser.diaryCount}개 작성`}
                followers={currentViewingUser.followerCount}
                following={currentViewingUser.followingCount}
                profileImgUrl={currentViewingUser.profileImgUrl}
                isMyProfile={isViewingMyProfile}
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

          <div className="w-full">
            {activeTab === "emotion" && <EmotionCardGrid userId={selectedUserInfo?.userId} />}
            {activeTab === "following" && (
              <FollowingList
                onUserSelect={handleUserSelect}
                targetUserId={currentViewingUser?.userId}
                isMyProfile={isViewingMyProfile}
              />
            )}
            {activeTab === "followers" && (
              <FollowersList
                onUserSelect={handleUserSelect}
                targetUserId={currentViewingUser?.userId}
                isMyProfile={isViewingMyProfile}
              />
            )}
          </div>
        </div>

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
