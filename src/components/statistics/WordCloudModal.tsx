import type { EmotionWordCloud } from "@/hooks/useWordCloudStatistics"

interface WordCloudModalProps {
  selectedImage: EmotionWordCloud | null
  closeModal: () => void
  getEmotionColor: (emotion: string) => string
  getEmotionCardColor: (emotion: string) => string
}

export default function WordCloudModal({ selectedImage, closeModal, getEmotionColor, getEmotionCardColor }: WordCloudModalProps) {
  return (
    <>
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className={`rounded-2xl p-6 ${getEmotionCardColor(selectedImage.emotion)}`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-800">{selectedImage.emotion}</h3>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border ${getEmotionColor(selectedImage.emotion)}`}
                >
                  {selectedImage.emotion}
                </span>
              </div>

              <div className="bg-white rounded-xl p-4">
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={`${selectedImage.emotion} 워드클라우드 확대`}
                  className="w-full h-auto max-h-[60vh] object-contain mx-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=400&width=600"
                  }}
                />
              </div>

              <p className="text-center text-gray-600 mt-4">
                {selectedImage.emotion} 감정과 관련된 키워드들을 워드클라우드로 표현했습니다
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
