// src/api/diary.ts
import api from "./axios";
interface CreateDiaryRequest {
  title: string;
  content: string;
  image?: File | null;
}

export async function submitDiary({ title, content, image }: CreateDiaryRequest) {
  const formData = new FormData()

  formData.append(
    "request",
    new Blob([JSON.stringify({ title, content })], {
      type: "application/json",
    }),
  )

  if (image) {
    formData.append("image", image)
  }

  try {
    // ✅ axios 인스턴스 사용 - Authorization 헤더는 interceptor에서 자동 처리
    const response = await api.post("/diary", formData, {
      headers: {
        // FormData 전송 시 Content-Type을 명시하지 않음 (boundary 자동 설정)
        "Content-Type": "multipart/form-data",
      },
    })

    return response.data.result
  } catch (error: any) {
    // ✅ axios 에러 처리
    const status = error.response?.status || 500
    const message = error.response?.data?.message || error.message
    throw new Error(`[일기 작성 실패] ${status}: ${message}`)
  }
}

export async function regenerateDiaryCard(
  diaryId: string,
  token: string,
  image?: File | null,
  title?: string,
  content?: string
) {
  const formData = new FormData();

  const requestData = {
    title: title || "",
    content: content || "",
  };

  formData.append(
    "request",
    new Blob([JSON.stringify(requestData)], {
      type: "application/json",
    })
  );

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch(`/api/diary?diaryId=${diaryId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`[재생성 실패] ${response.status}`);
  }

  const data = await response.json();
  return data;
}