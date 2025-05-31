import { uploadImageToServer } from "@/api/image"; // ✅ 이름 정확히 맞추기
import { useRef,useState } from "react";

export const useImageUpload = (token: string) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageHeight, setImageHeight] = useState(0);

  const heightIncreaseRatio = 0.1;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => {
      const result = ev.target?.result as string;
      setPreviewImage(result);

      const img = new Image();
      img.src = result;
      img.onload = () => {
        const adjustedHeight = img.height * heightIncreaseRatio;
        setImageHeight(adjustedHeight);
      };
    };
    reader.readAsDataURL(file);
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!selectedFile) return null;

    try {
      const res = await uploadImageAPI(selectedFile, token);

      if (res?.result?.imageUrl) {
        console.log("[업로드 결과 URL]", res.result.imageUrl);
        return res.result.imageUrl;
      } else {
        console.warn("⚠️ 응답에 imageUrl 없음", res);
        return null;
      }
    } catch (err) {
      console.error("❌ 이미지 업로드 중 오류", err);
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
};
