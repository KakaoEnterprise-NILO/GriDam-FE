import type { EmotionWordCloud } from "@/components/statistics/types"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

interface WordCloudModalProps { selectedImage: EmotionWordCloud | null; closeModal: () => void; getEmotionColor: (emotion: string) => string; getEmotionCardColor: (emotion: string) => string }

export default function WordCloudModal({ selectedImage, closeModal, getEmotionColor, getEmotionCardColor }: WordCloudModalProps) {
  return (
    <Dialog open={Boolean(selectedImage)} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="max-w-4xl max-h-[90vh] w-full bg-transparent border-0 p-4 shadow-none">
        <DialogTitle className="sr-only">{selectedImage?.emotion} 워드클라우드</DialogTitle>
        <DialogDescription className="sr-only">선택한 감정의 워드클라우드 이미지입니다.</DialogDescription>
        {selectedImage && <div className={`rounded-2xl p-6 ${getEmotionCardColor(selectedImage.emotion)}`}>
          <div className="flex items-center justify-between mb-4"><h3 className="text-2xl font-bold text-gray-800">{selectedImage.emotion}</h3><span className={`px-4 py-2 rounded-full text-sm font-medium border ${getEmotionColor(selectedImage.emotion)}`}>{selectedImage.emotion}</span></div>
          <div className="bg-white rounded-xl p-4"><img src={selectedImage.url || "/placeholder.svg"} alt={`${selectedImage.emotion} 워드클라우드 정보`} className="w-full h-auto max-h-[60vh] object-contain mx-auto" onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg?height=400&width=600" }} /></div>
          <p className="text-center text-gray-600 mt-4">{selectedImage.emotion} 감정과 관련된 단어들을 워드클라우드로 표현했습니다</p>
        </div>}
      </DialogContent>
    </Dialog>
  )
}
