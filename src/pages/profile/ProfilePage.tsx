import MainLayout from "@/components/common/MainLayout"
import EmotionCardGrid from "@/components/profile/EmotionCardGrid"
import FollowingList from "@/components/profile/FollowingList"
import FollowersList from "@/components/profile/FollowersList"
import ProfileEditModal from "@/components/profile/ProfileEditModal"
import ProfileNavigation from "@/components/profile/ProfileNavigation"
import ProfileOverview from "@/components/profile/ProfileOverview"
import { useProfilePage } from "@/components/profile/useProfilePage"

export default function ProfilePage() {
  const {
    userInfo,
    selectedUserInfo,
    currentViewingUser,
    isViewingMyProfile,
    isProfileLoading,
    isEditModalOpen,
    activeTab,
    openEditModal,
    closeEditModal,
    handleProfileUpdated,
    handleFollowingClick,
    handleFollowersClick,
    handleUserSelect,
    handleBackToMyProfile,
  } = useProfilePage()

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-8">
        {selectedUserInfo && <ProfileNavigation onBack={handleBackToMyProfile} />}

        <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-8 items-start">
          <div className="w-full">
            <ProfileOverview
              user={currentViewingUser}
              isLoading={isProfileLoading}
              isMyProfile={isViewingMyProfile}
              onEditProfile={openEditModal}
              onFollowingClick={handleFollowingClick}
              onFollowersClick={handleFollowersClick}
            />
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
            onClose={closeEditModal}
            currentUsername={userInfo.userName}
            currentProfileImg={userInfo.profileImgUrl}
            onSuccess={handleProfileUpdated}
          />
        )}
      </div>
    </MainLayout>
  )
}
