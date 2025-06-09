import axios from "axios";

export async function regenerateDiaryCard({
  diaryId,
  title,
  content,
  imageFile,
  token,
}: {
  diaryId: string;
  title: string;
  content: string;
  imageFile?: File | null;
  token: string;
}) {
  const formData = new FormData();

  const requestPayload = {
    title,
    content,
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(requestPayload)], {
      type: "application/json",
    })
  );

  if (imageFile) {
    formData.append("image", imageFile);
  }

  // ✅ 전송 직전 로그
  console.log("📤 [regenerateDiaryCard] 요청 준비 완료");
  console.log("➡️ diaryId:", diaryId);
  console.log("➡️ title:", title);
  console.log("➡️ content:", content);
  console.log("➡️ imageFile:", imageFile);
  console.log("➡️ token:", token);
  console.log("➡️ FormData Preview:");
  for (const [key, value] of formData.entries()) {
    if (key === "request") {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(`📝 [${key}]`, reader.result);
      };
      reader.readAsText(value as Blob);
    } else {
      console.log(`🖼️ [${key}]`, value);
    }
  }

  try {
    const res = await axios.patch(`/api/diary?diaryId=${diaryId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ [regenerateDiaryCard] 응답 수신:", res);

    if (!res.data.result) {
      throw new Error("응답 데이터에 result가 없습니다");
    }

    return res.data.result;
  } catch (err) {
    console.error("❌ [regenerateDiaryCard] 요청 실패", err);
    throw err;
  }
}
