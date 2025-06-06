import { useState } from "react";
import { submitDiary } from "../api/diary";

export function useDiaryForm(
  onComplete: (
    diaryId: string,
    data: { title: string; content: string; imageFile?: File | null }
  ) => void
) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteClick = async (
    image: File | null,
    token: string,
    title: string,
    content: string
  ) => {
    setIsCompleted(true);

    try {
      const diaryResult = await submitDiary({ title, content, image }, token);
      const diaryId = diaryResult?.diaryId;

      if (diaryId) {
        onComplete(diaryId, {
          title,
          content,
          imageFile: image,
        });
      } else {
        console.warn("❗ diaryId가 응답에 없습니다:", diaryResult);
      }
    } catch (err) {
      console.error("[일기 작성 실패 ❌]", err);
    }
  };

  return { isCompleted, setIsCompleted, handleCompleteClick };
}
