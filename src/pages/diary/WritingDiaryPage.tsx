import { useState } from "react"
import MainLayout from "@/components/common/MainLayout"
import WritingDiary from "@/components/writingdiary/WritingDiary"
import UploadEmotionCard from "@/components/writingdiary/UploadEmotionCard"
import EmotionPreviewCard from "@/components/writingdiary/EmotionPreviewCard"

export default function WritingDiaryPage() {
  const [isCompleted, setIsCompleted] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [diaryId, setDiaryId] = useState<string | null>(null)
  const [diaryInfo, setDiaryInfo] = useState<{ title: string; content: string; imageFile?: File | null } | null>(null)

  const handleComplete = (id: string, data: { title: string; content: string; imageFile?: File | null }) => {
    setDiaryId(id)
    setDiaryInfo(data)
    setIsCompleted(true)
  }

  return (
    <MainLayout>
      <div className={"relative z-10 flex min-w-0 flex-1 flex-col items-center gap-4 transition-all duration-500 md:gap-6 lg:flex-row lg:items-start lg:justify-center " + (isPreviewOpen ? "opacity-50 pointer-events-none" : "opacity-100")}>
        <div className={"w-full min-w-0 max-w-[700px] flex-shrink transition-transform duration-500 " + (isCompleted ? "lg:-translate-x-[50px]" : "lg:translate-x-[200px]")}>
          <WritingDiary onComplete={handleComplete} />
        </div>
        <div className={"w-full min-w-0 max-w-[600px] flex-shrink transition-opacity duration-500 " + (isCompleted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10")}>
          {diaryId && diaryInfo && (
            <UploadEmotionCard onPreview={() => setIsPreviewOpen(true)} diaryId={diaryId} diaryInfo={diaryInfo} />
          )}
        </div>
      </div>
      {isPreviewOpen && diaryId && <EmotionPreviewCard diaryId={diaryId} onClose={() => setIsPreviewOpen(false)} />}
    </MainLayout>
  )
}