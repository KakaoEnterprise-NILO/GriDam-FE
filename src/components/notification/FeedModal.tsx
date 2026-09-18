"use client"

import { useState } from "react"
import { X, Heart, Share, Bookmark, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

interface FeedModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedModal({ isOpen, onClose }: FeedModalProps) {
  const [comment, setComment] = useState("")
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
const handleSubmitComment = () => {
    if (comment.trim()) {
      setComment("")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogTitle className="sr-only">??곕굡</DialogTitle>
        <DialogDescription className="sr-only">??곕굡 ??곸뒠???類ㅼ뵥??랁??蹂????臾믨쉐??몃빍??</DialogDescription>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-3">
            <img
              src="/placeholder.svg?height=40&width=40"
              alt="Life_is_good"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">Life_is_good</h3>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="text-blue-600 border-blue-600 hover:bg-blue-50">
              ?遺얠쨮??
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="relative">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vFqyad3oiJPz1L580jbqy1HGjybmFN.png"
            alt="??곕굡 ???筌왖"
            className="w-full h-64 object-cover"
          />
        </div>

        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`transition-colors ${isLiked ? "text-red-500" : "text-gray-600 hover:text-red-500"}`}
            >
              <Heart className={`w-6 h-6 ${isLiked ? "fill-current" : ""}`} />
            </button>
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <Share className="w-6 h-6" />
            </button>
          </div>
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className={`transition-colors ${isBookmarked ? "text-blue-600" : "text-gray-600 hover:text-blue-600"}`}
          >
            <Bookmark className={`w-6 h-6 ${isBookmarked ? "fill-current" : ""}`} />
          </button>
        </div>

        <div className="px-4 pb-4">
          <p className="text-gray-800 mb-3">??삳뮎 ?ル뿭? ??롳펷~^^ ??롫뮎 癰귣?흭 ?癒?춦??뤾쉭??</p>
          <div className="flex gap-2 mb-4">
            <span className="text-blue-600 font-medium">#기쁨</span>
            <span className="text-blue-600 font-medium">#평화</span>
          </div>
        </div>

        <div className="border-t">
          <div className="p-4">
            <div className="flex items-start gap-3 mb-4">
              <img
                src="/placeholder.svg?height=32&width=32"
                alt="user_user"
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <span className="font-semibold text-sm">user_user</span>
                <p className="text-gray-800 text-sm">?뚣끋逾???袁⑥컭?귐딅춦??</p>
              </div>
            </div>
          </div>

          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="?蹂? ?곕떽?..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSubmitComment()}
              />
              <Button onClick={handleSubmitComment} disabled={!comment.trim()} size="sm" className="px-3">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
