"use client"

import { Users } from "lucide-react"
import FollowingUserItem from "./FollowingUserItem"
import FollowList from "./FollowList"
import { useFollowing } from "./useFollowLists"
import type { FollowListProps } from "./useFollowLists"

export default function FollowingList({
  onUserSelect,
  targetUserId,
  isMyProfile = true
}: FollowListProps) {
  const { users, loading, error, fetchUsers, handleUnfollow } = useFollowing(
    isMyProfile,
    targetUserId
  )

  return (
    <FollowList
      title="팔로잉 목록"
      icon={<Users className="h-5 w-5" />}
      users={users}
      loading={loading}
      error={error}
      isMyProfile={isMyProfile}
      emptyTitle={
        isMyProfile
          ? "팔로우한 사용자가 없습니다"
          : "팔로잉 목록이 비어있습니다"
      }
      emptyDescription={
        isMyProfile
          ? "다른 사용자들을 팔로우하여 그들의 활동을 확인해보세요."
          : "이 사용자는 아직 아무도 팔로우하지 않았습니다."
      }
      privateDescription="이 사용자의 팔로잉 목록은 비공개로 설정되어 있습니다."
      onRetry={fetchUsers}
      renderUser={(user) => (
        <FollowingUserItem
          userId={user.userId}
          profileImage={
            user.profileImgUrl || "/placeholder.svg?height=48&width=48"
          }
          username={user.userName}
          onUnfollow={
            isMyProfile ? () => handleUnfollow(user.userId) : undefined
          }
          onUserSelect={onUserSelect}
          showUnfollowButton={isMyProfile}
        />
      )}
    />
  )
}
