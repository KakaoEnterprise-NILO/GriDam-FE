"use client"

import { useState } from "react"
import MainLayout from "@/components/common/MainLayout"
import WritingDiary from "@/components/writingdiary/WritingDiary"
import UploadEmotionCard from "@/components/writingdiary/UploadEmotionCard"
import EmotionPreviewCard from "@/components/writingdiary/EmotionPreviewCard"

export default function WritingDiaryPage() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  const handleComplete = () => {
    setIsCompleted(true)
  }

  const handlePreviewOpen = () => {
    setIsPreviewOpen(true)
  }

  const handlePreviewClose = () => {
    setIsPreviewOpen(false)
  }

  return (
    <MainLayout>
      {/* 미리보기 블러 배경 */}
      {isPreviewOpen && (
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300"></div>
      )}

      <div
        className={`flex flex-1 justify-center items-start space-x-6 relative z-10 transition-all duration-500 ${
          isPreviewOpen ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Writing Diary */}
        <div
          className={`w-[700px] flex-shrink-0 transition-transform duration-500 ${
            isCompleted ? "translate-x-[-50px]" : "translate-x-[+200px]"
          }`}
        >
          <WritingDiary onComplete={handleComplete} />
        </div>

        {/* Upload Emotion Card */}
        <div
          className={`w-[600px] flex-shrink-0 transition-opacity duration-500 ${
            isCompleted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
          }`}
        >
          <UploadEmotionCard onPreview={handlePreviewOpen} />
        </div>
      </div>

      {/* 미리보기 카드 (모달) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-40">
          <EmotionPreviewCard onClose={handlePreviewClose} />
        </div>
      )}
    </MainLayout>
  )
}
