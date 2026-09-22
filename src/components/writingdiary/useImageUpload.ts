import { useRef, useState } from "react"
import {
  IMAGE_ACCEPT,
  validateImageFile,
} from "@/lib/imageValidation"

export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ""

    if (!file) return
    const validation = validateImageFile(file)
    if (!validation.valid) {
      setSelectedFile(null)
      setPreviewImage(null)
      setError(validation.error)
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
