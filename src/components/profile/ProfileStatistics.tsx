import { Heart, User } from "lucide-react"

interface ProfileStatisticsProps {
  followers: number
  following: number
  onFollowersClick?: () => void
  onFollowingClick?: () => void
}

export default function ProfileStatistics({
  followers,
  following,
  onFollowersClick,
  onFollowingClick,
}: ProfileStatisticsProps) {
  return (
    <div className="flex w-full gap-4 mb-6">
      <button type="button"
        onClick={onFollowersClick}
        className="flex-1 bg-blue-50 rounded-xl p-4 text-center border hover:bg-blue-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-center gap-1 mb-1">
          <Heart className="w-4 h-4 text-blue-500" />
          <p className="text-xl font-bold text-blue-600">{followers}</p>
        </div>
        <p className="text-xs text-gray-600">팔로워</p>
      </button>
      <button type="button"
        onClick={onFollowingClick}
        className="flex-1 bg-pink-50 rounded-xl p-4 text-center border hover:bg-pink-100 transition-colors cursor-pointer"
      >
        <div className="flex items-center justify-center gap-1 mb-1">
          <User className="w-4 h-4 text-purple-500" />
          <p className="text-xl font-bold text-purple-600">{following}</p>
        </div>
        <p className="text-xs text-gray-600">팔로잉</p>
      </button>
    </div>
  )
}
