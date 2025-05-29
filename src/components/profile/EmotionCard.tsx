import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Heart } from "lucide-react"

interface EmotionCardProps {
  src: string
  label: string
  mood: string
  date?: string
}

export default function EmotionCard({ src, label, mood, date }: EmotionCardProps) {
  const getMoodColor = (mood: string) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "bg-green-100 text-green-700 border-green-200"
      case "sad":
        return "bg-blue-100 text-blue-700 border-blue-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer">
      <div className="relative">
        <img
          src={src || "/placeholder.svg"}
          alt={label}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* 감정 뱃지 */}
        {mood && <Badge className={`absolute top-3 right-3 ${getMoodColor(mood)} shadow-lg`}>{mood}</Badge>}
      </div>

      <CardContent className="p-4">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{label}</h4>

          {date && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
              <span className="text-xs text-gray-500">감정 기록</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
