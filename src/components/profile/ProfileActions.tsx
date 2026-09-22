import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"

interface ProfileActionsProps {
  isMyProfile: boolean
  onEditProfile?: () => void
}

export default function ProfileActions({ isMyProfile, onEditProfile }: ProfileActionsProps) {
  if (!isMyProfile) return null

  return (
    <Button
      onClick={onEditProfile}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
    >
      <Edit className="h-4 w-4 mr-2" />
      프로필 편집
    </Button>
  )
}
