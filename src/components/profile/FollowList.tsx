import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { UserX, RefreshCw, Lock } from "lucide-react"
import type { FollowUser } from "@/services/followService"

interface FollowListProps {
  title: string
  icon: ReactNode
  users: FollowUser[]
  loading: boolean
  error: string | null
  isMyProfile: boolean
  emptyTitle: string
  emptyDescription: string
  privateDescription: string
  onRetry: () => void
  renderUser: (user: FollowUser) => ReactNode
}

export default function FollowList({
  title,
  icon,
  users,
  loading,
  error,
  isMyProfile,
  emptyTitle,
  emptyDescription,
  privateDescription,
  onRetry,
  renderUser
}: FollowListProps) {
  return (
    <div className="max-w-2xl mx-auto p-4 ml-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center gap-2 text-xl">
            {icon}
            {title}
            {!loading && users.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                {users.length}명
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          {loading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <Skeleton className="h-9 w-20" />
                </div>
              ))}
            </div>
          ) : error && !isMyProfile ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Lock className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                비공개 목록
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {privateDescription}
              </p>
            </div>
          ) : error ? (
            <div className="flex flex-col items-center justify-center py-8">
              <Alert className="max-w-md">
                <AlertDescription className="text-center">
                  {error}
                </AlertDescription>
              </Alert>
              {isMyProfile && (
                <Button
                  variant="outline"
                  onClick={onRetry}
                  className="mt-4"
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  다시 시도
                </Button>
              )}
            </div>
          ) : users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <UserX className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {emptyTitle}
              </h3>
              <p className="text-muted-foreground max-w-sm">
                {emptyDescription}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {users.map((user, index) => (
                <div
                  key={user.userId}
                  className="animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {renderUser(user)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
