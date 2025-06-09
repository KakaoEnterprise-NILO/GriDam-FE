"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { UserPlus, Loader2 } from "lucide-react"

interface FollowerUserItemProps {
  userId: string
  profileImage: string
  username: string
  onFollowBack?: () => Promise<void> | void
  onUserSelect?: (userId: string) => void
  showFollowBackButton?: boolean
}

export default function FollowerUserItem({
  userId,
  profileImage,
  username,
  onFollowBack,
  onUserSelect,
  showFollowBackButton = false,
}: FollowerUserItemProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollowBack = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!onFollowBack) return

    setIsFollowing(true)
    try {
      await onFollowBack()
    } finally {
      setIsFollowing(false)
    }
  }

  const handleUserClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log("🖱️ 팔로워 클릭됨:", userId, username)
    if (onUserSelect) {
      onUserSelect(userId)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center space-x-3 flex-1 cursor-pointer" onClick={handleUserClick}>
        <Avatar className="h-12 w-12 ring-2 ring-background">
          <AvatarImage src={profileImage || "/placeholder.svg"} alt={username} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{username}</span>
          <span className="text-sm text-muted-foreground">팔로워</span>
        </div>
      </div>

      {showFollowBackButton && onFollowBack && (
        <Button
          variant="outline"
          size="sm"
          disabled={isFollowing}
          onClick={handleFollowBack}
          className="hover:bg-primary hover:text-primary-foreground hover:border-primary"
        >
          {isFollowing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <UserPlus className="h-4 w-4 mr-1" />
              맞팔로우
            </>
          )}
        </Button>
      )}
    </div>
  )
}
