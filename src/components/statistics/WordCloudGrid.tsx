import { Sparkles, BarChart3 } from "lucide-react"
import type { EmotionWordCloud } from "@/components/statistics/types"

interface WordCloudGridProps {
  wordClouds: EmotionWordCloud[]
  generating: boolean
  handleGenerateWordCloud: () => void
  handleImageClick: (url: string, emotion: string) => void
  getEmotionColor: (emotion: string) => string
  getEmotionCardColor: (emotion: string) => string
}

export default function WordCloudGrid({ wordClouds, generating, handleGenerateWordCloud, handleImageClick, getEmotionColor, getEmotionCardColor }: WordCloudGridProps) {
  return (
    <>
      {wordClouds.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wordClouds.map((wordCloud) => (
            <div
              key={JSON.stringify([wordCloud.emotion, wordCloud.url])}
              className={`rounded-2xl p-6 border-2 shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105 ${getEmotionCardColor(wordCloud.emotion)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">{wordCloud.emotion}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium border ${getEmotionColor(wordCloud.emotion)}`}
                >
                  {wordCloud.emotion}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">{wordCloud.emotion} 감정과 관련된 키워드들</p>

              <div
                className="relative group cursor-pointer"
                onClick={() => handleImageClick(wordCloud.url || "/placeholder.svg", wordCloud.emotion)}
              >
                <img
                  src={wordCloud.url || "/placeholder.svg"}
                  alt={`${wordCloud.emotion} 워드클라우드`}
                  className="w-full h-96 object-contain bg-white rounded-xl transition-transform group-hover:scale-[1.02] shadow-inner"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/placeholder.svg?height=256&width=400"
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6 text-center">
          <Sparkles className="h-8 w-8 text-blue-500 mx-auto mb-4" />
          <p className="text-blue-800 font-medium">
            아직 생성된 워드클라우드가 없습니다. 일기를 작성한 후 워드클라우드를 생성해보세요!
          </p>
        </div>
      )}
      {wordClouds.length === 0 && (
        <div className="text-center py-16 mt-8">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BarChart3 className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-gray-900">워드클라우드를 생성해보세요</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              일기를 작성하면 감정별로 분석된
              <br />
              아름다운 워드클라우드가 생성됩니다
            </p>
            <button type="button"
              onClick={handleGenerateWordCloud}
              disabled={generating}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium shadow-md transition-all duration-200 transform hover:scale-105 mx-auto disabled:opacity-50 disabled:transform-none"
            >
              <Sparkles className="h-4 w-4" />첫 워드클라우드 생성하기
            </button>
          </div>
        </div>
      )}
    </>
  )
}
