import { useRef, useState } from "react";

export function useImageUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();

      reader.onload = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  return {
    fileInputRef,
    selectedFile,
    previewImage,
    handleImageChange,
    handleImageClick,
  };
}
