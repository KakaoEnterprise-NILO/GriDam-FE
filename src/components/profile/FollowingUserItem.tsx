"use client"

import { useState } from "react"
import FollowUserRow from "./FollowUserRow"
import { Button } from "@/components/ui/button"
import { UserMinus, Loader2 } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"

interface FollowingUserItemProps {
  userId: string
  profileImage: string
  username: string
  onUnfollow?: () => Promise<void> | void
  onUserSelect?: (userId: string) => void
  showUnfollowButton?: boolean
}

export default function FollowingUserItem({
  userId,
  profileImage,
  username,
  onUnfollow,
  onUserSelect,
  showUnfollowButton = true
}: FollowingUserItemProps) {
  const [isUnfollowing, setIsUnfollowing] = useState(false)

  const handleUnfollow = async () => {
    if (!onUnfollow) return

    setIsUnfollowing(true)
    try {
      await onUnfollow()
    } finally {
      setIsUnfollowing(false)
    }
  }

  return (
    <FollowUserRow
      userId={userId}
      profileImage={profileImage}
      username={username}
      description="팔로잉 중"
      onUserSelect={onUserSelect}
    >
      {showUnfollowButton && onUnfollow && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={isUnfollowing}
              className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
              onClick={(e) => e.stopPropagation()}
            >
              {isUnfollowing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  <UserMinus className="h-4 w-4 mr-1" />
                  언팔로우
                </>
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>언팔로우 확인</AlertDialogTitle>
              <AlertDialogDescription>
                <strong>{username}</strong>님을 언팔로우하시겠습니까?
                <br />이 작업은 되돌릴 수 있습니다.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleUnfollow}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                언팔로우
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </FollowUserRow>
  )
}
