import type { MouseEvent, ReactNode } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface FollowUserRowProps {
  userId: string
  profileImage: string
  username: string
  description: string
  onUserSelect?: (userId: string) => void
  children?: ReactNode
}

export default function FollowUserRow({
  userId,
  profileImage,
  username,
  description,
  onUserSelect,
  children
}: FollowUserRowProps) {
  const handleUserClick = (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onUserSelect?.(userId)
  }

  return (
    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <div
        className="flex items-center space-x-3 flex-1 cursor-pointer"
        onClick={handleUserClick}
      >
        <Avatar className="h-12 w-12 ring-2 ring-background">
          <AvatarImage
            src={profileImage || "/placeholder.svg"}
            alt={username}
          />
          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-medium text-foreground">{username}</span>
          <span className="text-sm text-muted-foreground">{description}</span>
        </div>
      </div>
      {children}
    </div>
  )
}
