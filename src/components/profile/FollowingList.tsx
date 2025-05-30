"use client"

import { useEffect, useState } from "react"
import api from "@/api/axios"
import FollowingUserItem from "@/components/profile/FollowingUserItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, UserX, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FollowedUser {
  userId: string
  userName: string
  profileImgUrl: string
}

export default function FollowingList() {
  const [followList, setFollowList] = useState<FollowedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFollowList = async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await api.get<{
        success: boolean
        result: {
          followList: FollowedUser[]
          nextCursor: number
          hasNext: boolean
        }
        message?: string
      }>("/follows/following", {
        params: {
          size: 20,
        },
      })

      if (res.data.success) {
        setFollowList(res.data.result.followList)
      } else {
        setError(res.data.message || "팔로우 목록을 불러오지 못했습니다.")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "알 수 없는 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFollowList()
  }, [])

  const handleUnfollow = async (userId: string) => {
    try {
      const res = await api.delete(`/follows/${userId}`) // ✅ URL에 직접 삽입
      if (res.data.success) {
        setFollowList((prev) => prev.filter((user) => user.userId !== userId))
      } else {
        alert(res.data.message || "언팔로우에 실패했습니다.")
      }
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "언팔로우 중 오류가 발생했습니다.")
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
      <h3 className="text-lg font-semibold text-foreground mb-2">팔로우한 사용자가 없습니다</h3>
      <p className="text-muted-foreground max-w-sm">다른 사용자들을 팔로우하여 그들의 활동을 확인해보세요.</p>
    </div>
  )

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert className="max-w-md">
        <AlertDescription className="text-center">{error}</AlertDescription>
      </Alert>
      <Button variant="outline" onClick={fetchFollowList} className="mt-4" disabled={loading}>
        <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
        다시 시도
      </Button>
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto p-4 ml-4">
      <Card className="shadow-sm">
        <CardHeader className="pb-4 pt-6">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Users className="h-5 w-5" />
            팔로잉 목록
            {!loading && followList.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">{followList.length}명</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState />
          ) : followList.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-2">
              {followList.map((user, index) => (
                <div
                  key={user.userId}
                  className="animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <FollowingUserItem
                    profileImage={user.profileImgUrl || "/placeholder.svg?height=48&width=48"}
                    username={user.userName}
                    onUnfollow={() => handleUnfollow(user.userId)}
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
