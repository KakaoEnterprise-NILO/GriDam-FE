"use client"

import { useEffect, useState } from "react"
import api from "@/api/axios"
import FollowerUserItem from "@/components/profile/FollowerUserItem"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, RefreshCw, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FollowerUser {
  userId: string
  userName: string
  profileImgUrl: string
}

export default function FollowersList() {
  const [followerList, setFollowerList] = useState<FollowerUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchFollowerList = async () => {
    try {
      setLoading(true)
      setError(null)

      const res = await api.get("/follows/follower", { params: { size: 20 } })
      console.log("API 팔로워 목록 응답:", res.data)

      if (res.data.success) {
        // 중복 제거 주석 처리
        // const uniqueFollowerList = res.data.result.followList.filter(
        //   (user: any, index: number, self: any[]) =>
        //     self.findIndex(u => u.userId === user.userId) === index
        // )
        // setFollowerList(uniqueFollowerList)

        // 중복 제거 없이 그대로 사용
        setFollowerList(res.data.result.followList)
      } else {
        setError(res.data.message || "팔로워 목록을 불러오지 못했습니다.")
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "알 수 없는 오류가 발생했습니다.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchFollowerList()
  }, [])

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
        <UserPlus className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">팔로워가 없습니다</h3>
      <p className="text-muted-foreground max-w-sm">당신을 팔로우한 사용자가 아직 없습니다.</p>
    </div>
  )

  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-8">
      <Alert className="max-w-md">
        <AlertDescription className="text-center">{error}</AlertDescription>
      </Alert>
      <Button variant="outline" onClick={fetchFollowerList} className="mt-4" disabled={loading}>
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
            팔로워 목록
            {!loading && followerList.length > 0 && (
              <span className="text-sm font-normal text-muted-foreground ml-auto">
                {followerList.length}명
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0 pb-4">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState />
          ) : followerList.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-2">
              {followerList.map((user, index) => (
                <div
                  key={`${user.userId}-${index}`}
                  className="animate-in fade-in-0 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <FollowerUserItem
                    profileImage={user.profileImgUrl || "/placeholder.svg?height=48&width=48"}
                    username={user.userName}
                    // onUnfollow={() => {}}
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
