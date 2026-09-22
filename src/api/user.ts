import type { UserInfo } from "@/types/profile"
import type { ApiResponse } from "@/api/types"
import api from "./axios"

export interface ChangePasswordRequest {
  password: string
  changedPassword: string
  checkPassword: string
}

export interface ChangePasswordResponse {
  timestamp: string
  success: boolean
  code: string
  result: {
    password: string
    changedPassword: string
    checkPassword: string
  }
  message: string
}

export async function getMyUserId(): Promise<string> {
  const res = await api.get<ApiResponse<{ userId: string }>>("/users/profile")
  const userId = res.data.result.userId
  if (!res.data.success || typeof userId !== "string" || !userId.trim()) {
    throw new Error("Invalid authenticated user profile.")
  }
  return userId
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

export const changePassword = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    const response = await api.patch<ChangePasswordResponse>("/users/password", data)
    return response.data
  } catch (error) {
    console.error("비밀번호 변경 API 에러:", error)
    throw error
  }
}
