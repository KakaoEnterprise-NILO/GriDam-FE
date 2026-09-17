"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from "lucide-react"

interface EmotionCardProps {
  id: string
  src: string
  label: string
  mood: string
  date: string
  hashtags?: string[]
}

export default function EmotionCard({ src, label, mood, date, hashtags = [] }: EmotionCardProps) {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={src || "/placeholder.svg"}
          alt={`${label} 감정 카드`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge
            className={`px-2 py-1 text-xs font-medium ${
              mood === "Happy" || mood === "PEACEFUL" || mood === "JOY"
                ? "bg-blue-100 text-blue-800"
                : mood === "Sad" || mood === "ANXIOUS" || mood === "FEAR"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-gray-100 text-gray-800"
            }`}
          >
            {label}
          </Badge>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex items-center text-xs text-gray-500 mb-2">
          <CalendarIcon className="h-3 w-3 mr-1" />
          <span>{date}</span>
        </div>
        {hashtags && hashtags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {hashtags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-gray-50">
                {tag}
              </Badge>
            ))}
            {hashtags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-gray-50">
                +{hashtags.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
