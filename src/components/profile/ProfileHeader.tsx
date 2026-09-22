import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ProfileHeaderProps {
  username: string
  introduction: string
  profileImgUrl: string
}

export default function ProfileHeader({ username, introduction, profileImgUrl }: ProfileHeaderProps) {
  return (
    <>
      <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-4 relative">
        <div className="absolute inset-0 bg-black/10 rounded-lg" />
      </div>

      <div className="flex justify-center -mt-16 mb-4">
        <Avatar className="h-32 w-32 border-4 border-white shadow-lg">
          <AvatarImage src={profileImgUrl || "/placeholder.svg"} alt={username} />
          <AvatarFallback className="text-2xl">
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="text-center space-y-2 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{username}</h2>
        <p className="text-gray-600">{introduction || "자기소개가 없습니다."}</p>
      </div>
    </>
  )
}
