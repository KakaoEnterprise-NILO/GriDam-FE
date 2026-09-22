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

      // 생성한 임시 URL을 해제해 메모리를 반환한다.
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("다운로드 실패", err);
    }
  };

  useEffect(() => {
  }, [imageUrl]);

  return (
    <button type="button"
      className="icon-button"
      onClick={handleDownload}
      title="감정 카드 다운로드"
    >
      <img src={downloadIcon} alt="다운로드" className="w-6 h-6" />
    </button>
  );
}
