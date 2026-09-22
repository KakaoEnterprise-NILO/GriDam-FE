import { Card, CardContent } from "@/components/ui/card"
import ProfileHeader from "./ProfileHeader"
import ProfileStatistics from "./ProfileStatistics"
import ProfileActions from "./ProfileActions"

interface UserProfileCardProps {
  username: string
  introduction: string
  followers: number
  following: number
  profileImgUrl: string
  isMyProfile?: boolean
  onEditProfile?: () => void
  onFollowingClick?: () => void
  onFollowersClick?: () => void
}

export default function UserProfileCard({
  username,
  introduction,
  followers,
  following,
  profileImgUrl,
  isMyProfile = false,
  onEditProfile,
  onFollowingClick,
  onFollowersClick,
}: UserProfileCardProps) {
  return (
    <Card className="w-full border-0 shadow-lg">
      <CardContent className="p-6">
        <ProfileHeader username={username} introduction={introduction} profileImgUrl={profileImgUrl} />
        <ProfileStatistics
          followers={followers}
          following={following}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />
        <ProfileActions isMyProfile={isMyProfile} onEditProfile={onEditProfile} />
      </CardContent>
    </Card>
  )
}
