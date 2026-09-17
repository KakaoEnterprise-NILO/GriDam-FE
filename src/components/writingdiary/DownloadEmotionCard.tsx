import downloadIcon from "@/assets/icons/download_button_icon.svg";
import { useEffect } from "react";

interface DownloadEmotionCardProps {
  imageUrl: string;
  fileName?: string;
}

export default function DownloadEmotionCard({
  imageUrl,
  fileName = "emotion_card.png",
}: DownloadEmotionCardProps) {
  const handleDownload = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl); // 메모리 해제
    } catch (err) {
      console.error("❌ 다운로드 실패", err);
    }
  };

  useEffect(() => {
    // 이미지 미리 로딩 등 필요한 경우 사용할 수 있음
  }, [imageUrl]);

  return (
    <button
      className="icon-button"
      onClick={handleDownload}
      title="감정 카드 다운로드"
    >
      <img src={downloadIcon} alt="다운로드" className="w-6 h-6" />
    </button>
  );
}
