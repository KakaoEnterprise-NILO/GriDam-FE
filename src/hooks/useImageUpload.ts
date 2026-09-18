import { useRef, useState } from "react"
import {
  ALLOWED_IMAGE_TYPES,
  IMAGE_ACCEPT,
  MAX_IMAGE_SIZE_BYTES,
  MAX_IMAGE_SIZE_MB,
} from "@/constants/imageUpload"

export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return

    if (!ALLOWED_IMAGE_TYPES.includes(file.type as (typeof ALLOWED_IMAGE_TYPES)[number])) {
      setSelectedFile(null)
      setPreviewImage(null)
      setError("JPG, PNG, WEBP 형식의 이미지만 업로드할 수 있습니다.")
      return
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setSelectedFile(null)
      setPreviewImage(null)
      setError(`이미지 용량은 ${MAX_IMAGE_SIZE_MB}MB 이하만 업로드할 수 있습니다.`)
      return
    }

    setError(null)
    setSelectedFile(file)

    const reader = new FileReader()

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setPreviewImage(reader.result)
      }
    }

    reader.readAsDataURL(file)
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  return {
    fileInputRef,
    selectedFile,
    previewImage,
    error,
    accept: IMAGE_ACCEPT,
    handleImageChange,
    handleImageClick,
  }
}
