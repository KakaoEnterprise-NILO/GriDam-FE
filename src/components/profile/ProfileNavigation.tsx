import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ProfileNavigation({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex items-center mb-4">
      <Button variant="ghost" onClick={onBack} className="flex items-center text-blue-600">
        <ArrowLeft className="h-4 w-4 mr-2" />내 프로필로 돌아가기
      </Button>
    </div>
  )
}
