import api from "./axios"

// 비밀번호 변경 API 요청 타입
export interface ChangePasswordRequest {
  password: string // 현재 비밀번호
  changedPassword: string // 새 비밀번호
  checkPassword: string // 새 비밀번호 확인
}

// 비밀번호 변경 API 응답 타입
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

// 비밀번호 변경 API 함수
export const changePassword = async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
  try {
    const response = await api.patch<ChangePasswordResponse>("/users/password", data)
    return response.data
  } catch (error) {
    console.error("비밀번호 변경 API 에러:", error)
    throw error
  }
}
