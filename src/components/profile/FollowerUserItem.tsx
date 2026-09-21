"use client"

import type React from "react"

import { useState } from "react"
import FollowUserRow from "./FollowUserRow"
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
  showFollowBackButton = false
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

  return (
    <FollowUserRow
      userId={userId}
      profileImage={profileImage}
      username={username}
      description="팔로워"
      onUserSelect={onUserSelect}
    >
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
    </FollowUserRow>
  )
}
