import type { ApiResponse } from "@/services/notificationService";
import api from "@/api/axios"

export async function getMyUserId(): Promise<string> {
  const res = await api.get<ApiResponse<{ userId: string }>>("/users/profile");


  return res.data.result.userId;
}
