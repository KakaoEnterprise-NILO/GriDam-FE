"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Edit, Heart, User } from "lucide-react"

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
        <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4 relative">
          <div className="absolute inset-0 bg-black/10 rounded-lg" />
        </div>

        <div className="flex justify-center -mt-16 mb-4">
          <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
            <AvatarImage src={profileImgUrl || "/placeholder.svg"} alt={username} />
            <AvatarFallback className="text-2xl">
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="text-center space-y-2 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
          <p className="text-gray-600">{introduction || "자기소개가 없습니다."}</p>
        </div>

        <div className="flex w-full gap-4 mb-6">
          <button
            onClick={onFollowersClick}
            className="flex-1 bg-blue-50 rounded-xl p-4 text-center border hover:bg-blue-100 transition-colors cursor-pointer"
          >
            <div className="flex items-center justify-center gap-1 mb-1">
              <Heart className="w-4 h-4 text-blue-500" />
              <p className="text-xl font-bold text-blue-600">{followers}</p>
            </div>
            <p className="text-xs text-gray-600">팔로워</p>
          </button>
          <button
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

        {isMyProfile && (
          <Button
            onClick={onEditProfile}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Edit className="h-4 w-4 mr-2" />
            프로필 편집
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
