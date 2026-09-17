"use client"

import { useRef, useCallback, useEffect, useState } from "react"
import api from "@/api/axios"
import FollowerUserItem from "@/components/profile/FollowerUserItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Heart, UserX, RefreshCw, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";

interface Follower {
  userId: string
  userName: string
  profileImgUrl: string
}

interface FollowersListProps {
  onUserSelect?: (userId: string) => void
  targetUserId?: string
  isMyProfile?: boolean
}

export default function FollowersList({ onUserSelect, targetUserId, isMyProfile = true }: FollowersListProps) {
  const [followerList, setFollowerList] = useState<Follower[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Ignore responses from a previous user/month or an unmounted component.
  const requestGeneration = useRef(0)

  const fetchFollowerList = useCallback(async () => {
    const generation = requestGeneration.current
    try {
      setLoading(true)
      setError(null)

      let res
      if (isMyProfile) {
        res = await api.get<{
          success: boolean
          result: {
            followList: Follower[] // API 문서에 따르면 followList입니다
            nextCursor: number
            hasNext: boolean
          }
          message?: string
        }>("/follows/follower", {
          params: {
            size: 20,
          },
        })
      } else {
        // 다른 사용자의 팔로워 목록 조회 (API가 있다면)
        // 현재는 API가 없으므로 빈 배열 반환
        setFollowerList([])
        setError("다른 사용자의 팔로워 목록은 비공개입니다.")
        return
      }

      if (generation !== requestGeneration.current) return

      if (res.data.success) {
        setFollowerList(res.data.result.followList)
      } else {
        setError(res.data.message || "팔로워 목록을 불러오지 못했습니다.")
      }
    } catch (err: unknown) {
      if (generation !== requestGeneration.current) return
      const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
      const errorMessage = err instanceof Error ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
          ? err.message : undefined
      setError(errorResponse?.data?.message || errorMessage || "알 수 없는 오류가 발생했습니다.")
    } finally {
      if (generation === requestGeneration.current) setLoading(false)
    }
  }, [isMyProfile])

  useEffect(() => {
    fetchFollowerList()
    return () => {
      requestGeneration.current += 1
    }
  }, [fetchFollowerList, targetUserId])

  const handleFollowBack = async (userId: string) => {
    try {
      const res = await api.post(`/follows/${userId}`)
      if (!res.data.success) {
        alert(res.data.message || "팔로우에 실패했습니다.")
      }
    } catch (err: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(err) ? err.response : undefined
      const errorMessage = err instanceof Error ? err.message
        : typeof err === "object" && err !== null && "message" in err && typeof err.message === "string"
          ? err.message : undefined
      alert(errorResponse?.data?.message || errorMessage || "팔로우 중 오류가 발생했습니다.")
    }
  }

  const LoadingSkeleton = () => (
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
  )

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <UserX className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {isMyProfile ? "팔로워가 없습니다" : "팔로워 목록이 비어있습니다"}
      </h3>
      <p className="text-muted-foreground max-w-sm">
        {isMyProfile ? "다른 사용자들과 소통하여 팔로워를 늘려보세요." : "이 사용자는 아직 팔로워가 없습니다."}
      </p>
    </div>
  )

  const PrivateState = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Lock className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">비공개 목록</h3>
      <p className="text-muted-foreground max-w-sm">이 사용자의 팔로워 목록은 비공개로 설정되어 있습니다.</p>
    </div>
  )

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert className="max-w-md">
        <AlertDescription className="text-center">{error}</AlertDescription>
      </Alert>
      {isMyProfile && (
        <Button variant="outline" onClick={fetchFollowerList} className="mt-4" disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          다시 시도
        </Button>
      )}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-4 ml-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Heart className="h-5 w-5" />
            {isMyProfile ? "팔로워 목록" : "팔로워 목록"}
            {!loading && followerList.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">{followerList.length}명</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          {loading ? (
            <LoadingSkeleton />
          ) : error && !isMyProfile ? (
            <PrivateState />
          ) : error ? (
            <ErrorState />
          ) : followerList.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-2">
              {followerList.map((user, index) => (
                <div
                  key={user.userId}
                  className="animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <FollowerUserItem
                    userId={user.userId}
                    profileImage={user.profileImgUrl || "/placeholder.svg?height=48&width=48"}
                    username={user.userName}
                    onFollowBack={isMyProfile ? undefined : () => handleFollowBack(user.userId)}
                    onUserSelect={onUserSelect}
                    showFollowBackButton={!isMyProfile}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
