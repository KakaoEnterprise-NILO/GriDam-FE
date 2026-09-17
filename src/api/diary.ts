import api from "./axios";
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";
interface CreateDiaryRequest {
  title: string;
  content: string;
  image?: File | null;
}

export async function submitDiary({ title, content, image }: CreateDiaryRequest) {
  const formData = new FormData()

  formData.append(
    "request",
    new Blob([JSON.stringify({ title, content })], {
      type: "application/json",
    }),
  )

  if (image) {
    formData.append("image", image)
  }

  try {
    const response = await api.post("/diary", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data.result
  } catch (error: unknown) {
    const errorResponse = isAxiosError<ApiErrorResponse>(error) ? error.response : undefined
    const errorMessage = error instanceof Error ? error.message
      : typeof error === "object" && error !== null && "message" in error && typeof error.message === "string"
        ? error.message : undefined
    const status = errorResponse?.status || 500
    const message = errorResponse?.data?.message || errorMessage
    throw new Error(`[일기 작성 실패] ${status}: ${message}`)
  }
}
