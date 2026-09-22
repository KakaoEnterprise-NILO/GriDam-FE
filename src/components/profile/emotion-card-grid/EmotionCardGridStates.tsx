import { Sparkles, Lock } from "lucide-react"
export function EmotionCardGridEmpty({ userId }: { userId?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Sparkles className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        {userId ? "감정 카드가 없습니다" : "아직 감정 카드가 없습니다"}
      </h3>
      <p className="text-muted-foreground max-w-sm">
        {userId
          ? "이 사용자는 아직 감정 카드를 작성하지 않았습니다."
          : "첫 번째 감정 카드를 작성해보세요."}
      </p>
    </div>
  )
}
export function EmotionCardGridPrivate() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-6 mb-4">
        <Lock className="h-12 w-12 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">
        비공개 감정 카드
      </h3>
      <p className="text-muted-foreground max-w-sm">
        이 사용자의 감정 카드는 비공개로 설정되어 있습니다.
      </p>
    </div>
  )
}
