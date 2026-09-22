import api from "@/api/axios"

export interface FollowUser {
  userId: string
  userName: string
  profileImgUrl: string
}

export interface FollowListResponse {
  success: boolean
  result: {
    followList: FollowUser[]
    nextCursor: number
    hasNext: boolean
  }
  message?: string
}

interface FollowActionResponse {
  success: boolean
  message?: string
}

export async function getFollowers() {
  const response = await api.get<FollowListResponse>("/follows/follower", {
    params: { size: 20 }
  })
  return response.data
}

export async function getFollowing() {
  const response = await api.get<FollowListResponse>("/follows/following", {
    params: { size: 20 }
  })
  return response.data
}

export async function followUser(userId: string) {
  const response = await api.post<FollowActionResponse>(`/follows/${userId}`)
  return response.data
}

export async function unfollowUser(userId: string) {
  const response = await api.delete<FollowActionResponse>(`/follows/${userId}`)
  return response.data
}
