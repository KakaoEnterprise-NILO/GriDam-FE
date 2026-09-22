import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { ko } from "date-fns/locale"
import FeedModal from "./FeedModal"

interface NotificationCardProps {
  id: number
  imageUrl: string
  noticeType: string
  message: string
  content: string
  createdAt: string
  checked: boolean
  onClick?: () => void
}

export default function NotificationCard({
  imageUrl,
  noticeType,
  message,
  content,
  createdAt,
  checked,
  onClick,
}: NotificationCardProps) {
  const [showFeedModal, setShowFeedModal] = useState(false)

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: ko })
    } catch {
      return dateString
    }
  }

  const handleClick = () => {
    setShowFeedModal(true)
    onClick?.()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`flex w-full items-start gap-3 rounded-lg border-0 px-4 py-3 text-left transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
          !checked ? "bg-blue-50 border-l-4 border-blue-400" : "bg-transparent"
        }`}
      >
        <span className="relative flex-shrink-0">
          <img
            src={imageUrl || "/placeholder.svg?height=40&width=40"}
            alt="알림 이미지"
            className="h-10 w-10 rounded-full border-2 border-white object-cover shadow-sm"
          />
          {!checked && (
            <span
              aria-hidden="true"
              className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-white bg-blue-500"
            />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-2">
            <span className="block min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-gray-900">{message}</span>
              <span className="mt-1 block line-clamp-2 text-sm text-gray-600">{content}</span>
              <span className="mt-2 inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800">
                {noticeType}
              </span>
            </span>
            <span className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500">{formatTime(createdAt)}</span>
          </span>
        </span>
      </button>

      <FeedModal isOpen={showFeedModal} onClose={() => setShowFeedModal(false)} />
    </>
  )
}