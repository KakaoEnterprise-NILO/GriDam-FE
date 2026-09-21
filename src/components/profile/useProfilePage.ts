import { useCallback, useEffect, useState } from "react"
import { getMyProfile, getUserProfile } from "@/services/userService"
import type { UserInfo } from "@/types/profile"
import type { ActiveTab } from "./types"

export function useProfilePage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null)
  const [selectedUserInfo, setSelectedUserInfo] = useState<UserInfo | null>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ActiveTab>("emotion")
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingSelectedUser, setIsLoadingSelectedUser] = useState(false)

  const fetchUserInfo = useCallback(async () => {
    try {
      setIsLoading(true)
      setUserInfo(await getMyProfile())
    } catch (error) {
      console.error("유저 정보 불러오기 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchSelectedUserInfo = async (userId: string) => {
    try {
      setIsLoadingSelectedUser(true)
      setSelectedUserInfo(await getUserProfile(userId))
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

  return {
    userInfo,
    selectedUserInfo,
    currentViewingUser,
    isViewingMyProfile,
    isProfileLoading: (isLoading && !selectedUserInfo) || isLoadingSelectedUser,
    isEditModalOpen,
    activeTab,
    openEditModal: () => setIsEditModalOpen(true),
    closeEditModal: () => setIsEditModalOpen(false),
    handleProfileUpdated,
    handleFollowingClick,
    handleFollowersClick,
    handleUserSelect,
    handleBackToMyProfile,
  }
}
