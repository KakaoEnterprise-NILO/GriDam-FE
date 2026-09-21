export interface UploadEmotionCardProps {
  onPreview: () => void
  diaryId: string
  diaryInfo: {
    title: string
    content: string
    imageFile?: File | null
  }
}
