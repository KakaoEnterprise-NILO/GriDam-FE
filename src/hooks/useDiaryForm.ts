import { useState } from "react";
import { submitDiary } from "../api/diary";

export function useDiaryForm(onComplete: (diaryId: string) => void) {
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

      // submitDiary가 result만 리턴한다면 이 부분 단순화
      const diaryId = diaryResult?.diaryId;

      if (diaryId) {
        console.log("📌 전달할 diaryId:", diaryId);
        onComplete(diaryId);
      } else {
        console.warn("❗ diaryId가 응답에 없습니다:", diaryResult);
      }
    } catch (err) {
      console.error("[일기 작성 실패 ❌]", err);
    }
  };

  return { isCompleted, setIsCompleted, handleCompleteClick };
}
