"use client"

import { Heart } from "lucide-react"
import FollowerUserItem from "./FollowerUserItem"
import FollowList from "./FollowList"
import { useFollowers } from "./useFollowLists"
import type { FollowListProps } from "./useFollowLists"

export default function FollowersList({
  onUserSelect,
  targetUserId,
  isMyProfile = true
}: FollowListProps) {
  const { users, loading, error, fetchUsers, handleFollowBack } = useFollowers(
    isMyProfile,
    targetUserId
  )

  return (
    <FollowList
      title="팔로워 목록"
      icon={<Heart className="h-5 w-5" />}
      users={users}
      loading={loading}
      error={error}
      isMyProfile={isMyProfile}
      emptyTitle={
        isMyProfile ? "팔로워가 없습니다" : "팔로워 목록이 비어있습니다"
      }
      emptyDescription={
        isMyProfile
          ? "다른 사용자들과 소통하여 팔로워를 늘려보세요."
          : "이 사용자는 아직 팔로워가 없습니다."
      }
      privateDescription="이 사용자의 팔로워 목록은 비공개로 설정되어 있습니다."
      onRetry={fetchUsers}
      renderUser={(user) => (
        <FollowerUserItem
          userId={user.userId}
          profileImage={
            user.profileImgUrl || "/placeholder.svg?height=48&width=48"
          }
          username={user.userName}
          onFollowBack={
            isMyProfile ? undefined : () => handleFollowBack(user.userId)
          }
          onUserSelect={onUserSelect}
          showFollowBackButton={!isMyProfile}
        />
      )}
    />
  )
}
