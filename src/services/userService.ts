import type { UserInfo } from "@/types/profile"
import type { ApiResponse } from "@/services/notificationService";
import api from "@/api/axios"

export async function getMyUserId(): Promise<string> {
  const res = await api.get<ApiResponse<{ userId: string }>>("/users/profile");

  const userId = res.data.result.userId;
  if (!res.data.success || typeof userId !== "string" || !userId.trim()) {
    throw new Error("Invalid authenticated user profile.");
  }
  return userId;
}

export async function getMyProfile(): Promise<UserInfo> {
  const response = await api.get<ApiResponse<UserInfo>>("/users/profile")
  return response.data.result
}

export async function getUserProfile(userId: string): Promise<UserInfo> {
  const response = await api.get<ApiResponse<UserInfo>>("/users/profile/" + userId)
  return response.data.result
}

export async function updateNickname(nickname: string): Promise<void> {
  await api.patch("/users/nickname", { nickname })
}

export async function updateProfileImage(image: File): Promise<void> {
  const formData = new FormData()
  formData.append("image", image)
  await api.patch("/users/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  })
}
