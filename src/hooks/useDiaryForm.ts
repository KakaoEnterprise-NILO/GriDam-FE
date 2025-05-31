// src/hooks/useDiaryForm.ts
import { useState } from "react";
import { submitDiary } from "../api/diary";

export function useDiaryForm(onComplete: () => void) {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleCompleteClick = async (
    image: File | null,
    token: string
  ) => {
    setIsCompleted(true);

    try {
      const title = (
        document.querySelector("input[placeholder='제목']") as HTMLInputElement
      )?.value || "";

      const content = (
        document.querySelector("textarea") as HTMLTextAreaElement
      )?.value || "";

      const diaryResult = await submitDiary({ title, content, image }, token);
      console.log("[일기 작성 성공 ✅]", diaryResult);
      onComplete();
    } catch (err) {
      console.error("[일기 작성 실패 ❌]", err);
    }
  };

  return { isCompleted, setIsCompleted, handleCompleteClick };
}
