import { useEffect, useState } from "react";
export function useStatisticsImageModal() {
  const [selectedImage, setSelectedImage] = useState<{
    url: string;
    emotion: string;
  } | null>(null);
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);
    };
    if (selectedImage) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage]);
  return {
    selectedImage,
    openImage: (url: string, emotion: string) =>
      setSelectedImage({ url, emotion }),
    closeImage: () => setSelectedImage(null),
  };
}
