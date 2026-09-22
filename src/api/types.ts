export interface ApiResponse<T> {
  timestamp: string
  success: boolean
  code: string
  result: T
  message: string
}
