import { useState } from "react";
import { submitDiary } from "@/api/diary";

export function useDiaryForm(
  onComplete: (
    diaryId: string,
    data: { title: string; content: string; imageFile?: File | null }
  ) => void
) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCompleteClick = async (
    image: File | null,
    title: string,
    content: string
  ) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const diaryResult = await submitDiary({ title, content, image });
      const diaryId = diaryResult?.diaryId;

      if (diaryId) {
        onComplete(diaryId, {
          title,
          content,
          imageFile: image,
        });
      } else {
        setError("저장 응답에 일기 ID가 없습니다. 다시 시도해주세요.");
        console.warn("diaryId가 응답에 없습니다:", diaryResult);
      }
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "일기 저장에 실패했습니다. 다시 시도해주세요.");
      console.error("일기 작성 실패", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, error, handleCompleteClick };
}
