import api from "@/api/axios"

export interface NotificationItem {
  id: number
  noticeType: string
  entityId: number
  imageUrl: string
  message: string
  content: string
  checked: boolean
  createdAt: string
}

export interface NotificationResponse {
  notiList: NotificationItem[]
  nextCursor: number
  hasNext: boolean
}

export interface ApiResponse<T> {
  timestamp: string
  success: boolean
  code: string
  result: T
  message: string
}

interface NotificationParams {
  size: number
  cursor?: number
}

export const getUnreadNotifications = async (cursor?: number, size = 4): Promise<NotificationResponse> => {
  try {
    const params: NotificationParams = { size }
    if (cursor) params.cursor = cursor

    const response = await api.get<ApiResponse<NotificationResponse>>("/notifications/notifications/unchecked", {
      params,
    })

    return response.data.result
  } catch (error) {
    console.error("안읽은 알림 조회 실패:", error)
    throw error
  }
}

export const getRecentNotifications = async (cursor?: number, size = 3): Promise<NotificationResponse> => {
  try {
    const params: NotificationParams = { size }
    if (cursor) params.cursor = cursor

    const response = await api.get<ApiResponse<NotificationResponse>>("/notifications/notifications/recent", {
      params,
    })

    return response.data.result
  } catch (error) {
    console.error("최근 알림 조회 실패:", error)
    throw error
  }
}
