export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"] as const
export const IMAGE_ACCEPT = ALLOWED_IMAGE_TYPES.join(",")
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024
export const MAX_IMAGE_SIZE_MB = 10
