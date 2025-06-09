
import { useRef,useState } from "react";
import api from "@/api/axios"; // ✅ 커스텀 axios 인스턴스 import
export function useImageUpload() {
  const token = localStorage.getItem("accessToken"); // ✅ 내부에서 가져오기

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageHeight, _] = useState<number>(0);
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

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const res = await api.post("/images", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, // ✅ 내부에서 token 사용
        },
      });
      return res.data.imageUrl;
    } catch (err) {
      console.error("이미지 업로드 실패", err);
      return null;
    }
  };

  return {
    fileInputRef,
    selectedFile,
    previewImage,
    imageHeight,
    handleImageChange,
    handleImageClick,
    uploadImage,
  };
}