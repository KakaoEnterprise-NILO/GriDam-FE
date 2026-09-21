"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Camera, User, Save, X, Edit3 } from "lucide-react"
import { updateNickname, updateProfileImage } from "@/services/userService"

interface ProfileEditModalProps {
  isOpen: boolean
  onClose: () => void
  currentUsername: string
  currentProfileImg: string
  onSuccess: () => void
}

export default function ProfileEditModal({
  isOpen,
  onClose,
  currentUsername,
  currentProfileImg,
  onSuccess,
}: ProfileEditModalProps) {
  const [isEditingUsername, setIsEditingUsername] = useState(false)
  const [newUsername, setNewUsername] = useState(currentUsername)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setNewUsername(currentUsername)
  }, [currentUsername])

  const handleUsernameSave = async () => {
    if (newUsername.trim() === "") return

    setIsLoading(true)
    try {
      await updateNickname(newUsername)
      onSuccess()
    } catch (error) {
      console.error("❌ 닉네임 수정 실패:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleProfileImageEdit = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = "image/*"

    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (!file) return

      setIsLoading(true)
      try {
        await updateProfileImage(file)
        onSuccess()
      } catch (error) {
        console.error("❌ 프로필 이미지 수정 실패:", error)
      } finally {
        setIsLoading(false)
      }
    }

    input.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg border-0 shadow-2xl">
        <DialogHeader className="text-center pb-4">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            프로필 수정
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <Card className="border border-gray-100 bg-gradient-to-br from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="w-28 h-28 border-4 border-white shadow-xl">
                    <AvatarImage src={currentProfileImg || "/placeholder.svg"} alt="프로필 이미지" />
                    <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white">
                      <User className="w-14 h-14" />
                    </AvatarFallback>
                  </Avatar>
                  <button
                    onClick={handleProfileImageEdit}
                    disabled={isLoading}
                    className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full p-3 shadow-lg disabled:opacity-50 hover:scale-110"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm text-gray-600 text-center">
                  프로필 이미지를 변경하려면 카메라 아이콘을 클릭하세요
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-gray-100">
            <CardContent className="p-6">
              {isEditingUsername ? (
                <div className="space-y-4">
                  <Label htmlFor="username">새 닉네임</Label>
                  <Input
                    id="username"
                    value={newUsername}
                    onChange={(e) => setNewUsername(e.target.value)}
                    maxLength={20}
                  />
                  <div className="text-xs text-right text-gray-500">{newUsername.length}/20</div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleUsernameSave}
                      disabled={isLoading || newUsername.trim() === ""}
                      className="flex-1 bg-green-500 text-white"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      저장
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditingUsername(false)}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      취소
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <Label>현재 닉네임</Label>
                  <p className="text-xl font-bold">{currentUsername || "닉네임 없음"}</p>
                  <Button
                    onClick={() => setIsEditingUsername(true)}
                    className="w-full bg-blue-500 text-white"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    닉네임 수정하기
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  )
}
