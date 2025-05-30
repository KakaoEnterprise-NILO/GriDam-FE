"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface FollowingUserItemProps {
  profileImage: string
  username: string
  onUnfollow: () => Promise<void> | void
}

export default function FollowingUserItem({ profileImage, username, onUnfollow }: FollowingUserItemProps) {
  const [isUnfollowing, setIsUnfollowing] = useState(false)

  const handleUnfollow = async () => {
    setIsUnfollowing(true)
    try {
      await onUnfollow()
    } finally {
      setIsUnfollowing(false)
    }
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div className="flex items-center space-x-3">
        <Avatar className="h-12 w-12 ring-2 ring-background">
          <AvatarImage src={profileImage || "/placeholder.svg"} alt={username} />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{username}</span>
          <span className="text-sm text-muted-foreground">팔로잉 중</span>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            disabled={isUnfollowing}
            className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
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
    </div>
  )
}
