import { useEffect, useRef, useState, useCallback } from "react"
import NotificationCard from "./NotificationCard"
import { getUnreadNotifications, type NotificationItem } from "@/api/notification"
import { Loader2, Bell } from "lucide-react"

export default function NotificationList() {
  const observerRef = useRef<HTMLDivElement | null>(null)
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [hasNext, setHasNext] = useState(true)
  const [nextCursor, setNextCursor] = useState<number | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  const loadInitialData = useCallback(async () => {
    try {
      setInitialLoading(true)
      setError(null)

      const response = await getUnreadNotifications(undefined, 4)

      setNotifications(response.notiList)
      setNextCursor(response.nextCursor)
      setHasNext(response.hasNext)
    } catch (err) {
      setError("알림을 불러오는데 실패했습니다.")
      console.error("초기 알림 로딩 실패:", err)
    } finally {
      setInitialLoading(false)
    }
  }, [])

  const loadMoreNotifications = useCallback(async () => {
    if (loading || !hasNext || !nextCursor || initialLoading) return

    try {
      setLoading(true)
      setError(null)

      const response = await getUnreadNotifications(nextCursor, 4)

      setNotifications((prev) => [...prev, ...response.notiList])
      setNextCursor(response.nextCursor)
      setHasNext(response.hasNext)
    } catch (err) {
      setError("알림을 불러오는데 실패했습니다.")
      console.error("추가 알림 로딩 실패:", err)
    } finally {
      setLoading(false)
    }
  }, [loading, hasNext, nextCursor, initialLoading])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  useEffect(() => {
    if (initialLoading) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNext && !loading) {
          loadMoreNotifications()
        }
      },
      {
        threshold: 0.1,
        rootMargin: "20px",
      },
    )

    const current = observerRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [loadMoreNotifications, hasNext, loading, initialLoading])


  if (initialLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">안 읽은 알림</h2>
              <p className="text-sm text-gray-600">로딩 중...</p>
            </div>
          </div>
        </div>
        <div className="h-[22rem] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Bell className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">안 읽은 알림</h2>
            <p className="text-sm text-gray-600">{notifications.filter((n) => !n.checked).length}개의 새로운 알림</p>
          </div>
        </div>
      </div>

      <div className="h-[22rem] overflow-y-auto">
        {error ? (
          <div className="flex items-center justify-center h-full text-red-500 text-sm">{error}</div>
        ) : notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Bell className="w-12 h-12 text-gray-300 mb-3" />
            <p className="text-sm">새로운 알림이 없습니다</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => (
              <NotificationCard
                key={notification.id}
                id={notification.id}
                imageUrl={notification.imageUrl}
                noticeType={notification.noticeType}
                message={notification.message}
                content={notification.content}
                createdAt={notification.createdAt}
                checked={notification.checked}
              />
            ))}
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
            <span className="ml-2 text-sm text-gray-500">로딩 중...</span>
          </div>
        )}

        {hasNext && !loading && notifications.length > 0 && <div ref={observerRef} className="h-4" />}
      </div>
    </div>
  )
}
