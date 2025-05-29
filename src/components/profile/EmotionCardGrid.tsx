import EmotionCard from "./EmotionCard"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

const cards = [
  { src: "/emotioncard_image.png", label: "PEACEFUL", mood: "Happy", date: "2024.01.15" },
  { src: "/sea.avif", label: "쓸쓸함", mood: "Sad", date: "2024.01.14" },
  { src: "/우울한.jpg", label: "PEACEFUL", mood: "Happy", date: "2024.01.13" },
  { src: "/logo.png", label: "PEACEFUL", mood: "Happy", date: "2024.01.12" },
  { src: "/logo.png", label: "쓸쓸함", mood: "Sad", date: "2024.01.11" },
  { src: "/placeholder.svg?height=200&width=160", label: "PEACEFUL", mood: "Happy", date: "2024.01.10" },
  { src: "/placeholder.svg?height=200&width=160", label: "PEACEFUL", mood: "Happy", date: "2024.01.09" },
  { src: "/placeholder.svg?height=200&width=160", label: "쓸쓸함", mood: "Sad", date: "2024.01.08" },
  { src: "/placeholder.svg?height=200&width=160", label: "PEACEFUL", mood: "Happy", date: "2024.01.07" },
]

export default function EmotionCardGrid() {
  return (
    <div className="rounded-xl overflow-hidden shadow-lg bg-white p-0 py-0">
      <Card className="border-0 rounded-none">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-800">감정 하이라이트</h3>
              <p className="text-sm text-gray-600">최근 기록된 감정들을 확인해보세요</p>
            </div>
            <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700">
              {cards.length}개
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <EmotionCard key={index} {...card} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
