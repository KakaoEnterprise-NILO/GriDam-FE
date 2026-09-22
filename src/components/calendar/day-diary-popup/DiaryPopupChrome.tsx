import { X, WalletCards, BookOpen } from "lucide-react"
import { formatDate } from "./utils"
import type { DiaryPopupHeaderProps, DiaryPopupTabsProps } from "./types"

export function DiaryPopupHeader({ date, title, onClose }: DiaryPopupHeaderProps) {
  return (
    <div className="relative text-center p-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-b border-gray-100">
      <p className="text-sm text-gray-500 mb-2 font-medium">{formatDate(date)}</p>
      <h2 className="text-xl font-bold text-gray-800 truncate px-8">
        {title}
      </h2>
      <button type="button"
        onClick={onClose}
        aria-label="Close diary popup"
        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-full transition-all duration-200"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  )
}

export function DiaryPopupTabs({ showCard, onSelect }: DiaryPopupTabsProps) {
  return (
    <div className="p-6 border-t border-gray-100 bg-white">
      <div className="flex gap-3">
        <button type="button"
          onClick={() => onSelect(false)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
            ${!showCard ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <BookOpen className="w-4 h-4" />
          일기
        </button>
        <button type="button"
          onClick={() => onSelect(true)}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-200
            ${showCard ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
        >
          <WalletCards className="w-4 h-4" />
          감정 카드
        </button>
      </div>
    </div>
  )
}
