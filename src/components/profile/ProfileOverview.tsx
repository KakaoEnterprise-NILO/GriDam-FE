import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import type { UserInfo } from "@/types/profile"
import UserProfileCard from "./UserProfileCard"
import { getProfileIntroduction } from "./utils"

interface ProfileOverviewProps {
  user: UserInfo | null
  isLoading: boolean
  isMyProfile: boolean
  onEditProfile: () => void
  onFollowingClick: () => void
  onFollowersClick: () => void
}

export default function ProfileOverview({
  user,
  isLoading,
  isMyProfile,
  onEditProfile,
  onFollowingClick,
  onFollowersClick,
}: ProfileOverviewProps) {
  if (isLoading) {
    return (
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
    )
  }

  if (!user) {
    return (
      <Card className="w-full border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <p className="text-gray-500">프로필 정보를 불러올 수 없습니다.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <UserProfileCard
      username={user.userName}
      introduction={getProfileIntroduction(user)}
      followers={user.followerCount}
      following={user.followingCount}
      profileImgUrl={user.profileImgUrl}
      isMyProfile={isMyProfile}
      onEditProfile={onEditProfile}
      onFollowingClick={onFollowingClick}
      onFollowersClick={onFollowersClick}
    />
  )
}
