"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"

interface FollowerUserItemProps {
  profileImage: string
  username: string
  onFollowBack?: () => Promise<void> | void // 선택적으로 follow-back 기능 지원
  isFollowBackAvailable?: boolean
}

export default function FollowerUserItem({
  profileImage,
  username,
  onFollowBack,
  isFollowBackAvailable = false,
}: FollowerUserItemProps) {
  return (
    <div className="flex items-center justify-between p-4 rounded-md hover:bg-muted transition">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={profileImage} alt={`${username}의 프로필 이미지`} />
          <AvatarFallback>{username.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-medium text-sm">{username}</p>
        </div>
      </div>

      {isFollowBackAvailable && onFollowBack && (
        <Button
          variant="outline"
          size="sm"
          onClick={onFollowBack}
          className="gap-1"
        >
          <UserPlus className="w-4 h-4" />
          맞팔로우
        </Button>
      )}
    </div>
  )
}
