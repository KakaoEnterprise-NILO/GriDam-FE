import { useCallback, useEffect, useState } from "react"
import { getMyProfile, getUserProfile } from "@/api/user"
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
    setActiveTab("emotion")
  }

  const handleBackToMyProfile = () => {
    setSelectedUserInfo(null)
    setActiveTab("emotion")
  }


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
