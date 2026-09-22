export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const
export const IMAGE_ACCEPT = ALLOWED_IMAGE_TYPES.join(",")
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024
export const MAX_IMAGE_SIZE_MB = 10
export const IMAGE_FORMAT_LABEL = "JPG, PNG, WEBP"

export type ImageValidationResult =
  | { valid: true }
  | { valid: false; error: string }

export function validateImageFile(file: Pick<File, "type" | "size">): ImageValidationResult {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
    return {
      valid: false,
      error: `${IMAGE_FORMAT_LABEL} 형식의 이미지만 업로드할 수 있습니다.`,
    }
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: `이미지 용량은 ${MAX_IMAGE_SIZE_MB}MB 이하만 업로드할 수 있습니다.`,
    }
  }

  return { valid: true }
}
