"use client"

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
  //id,
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
      <div
        onClick={handleClick}
        className={`cursor-pointer flex items-start gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:shadow-sm ${
          !checked ? "bg-blue-50 border-l-4 border-blue-400" : ""
        }`}
      >
        <div className="relative flex-shrink-0">
          <img
            src={imageUrl || "/placeholder.svg?height=40&width=40"}
            alt="notification"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          {!checked && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{message}</p>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{content}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {noticeType}
                </span>
              </div>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap flex-shrink-0">{formatTime(createdAt)}</span>
          </div>
        </div>
      </div>

      <FeedModal isOpen={showFeedModal} onClose={() => setShowFeedModal(false)} />
    </>
  )
}
