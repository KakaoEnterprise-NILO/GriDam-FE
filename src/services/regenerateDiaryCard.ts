import api from "axios"; // 또는 api가 axios 인스턴스면 'import api from "../api"' 등 경로 맞춰서

export async function regenerateDiaryCard({
  diaryId,
  title,
  content,
  imageFile,
}: {
  diaryId: string;
  title: string;
  content: string;
  imageFile?: File | null;
}) {
  const formData = new FormData();

  const requestPayload = { title, content };
  formData.append("request", new Blob([JSON.stringify(requestPayload)], { type: "application/json" }));

  if (imageFile) {
    formData.append("image", imageFile);
  }

  try {
    // Authorization 헤더는 api 인스턴스가 자동으로 추가한다고 가정
    const res = await api.patch(`/diary?diaryId=${diaryId}`, formData);

    if (!res.data.result) {
      throw new Error("응답 데이터에 result가 없습니다");
    }

    return res.data.result;
  } catch (err) {
    console.error("❌ [regenerateDiaryCard] 요청 실패", err);
    throw err;
  }
}
