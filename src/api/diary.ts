// src/api/diary.ts

interface CreateDiaryRequest {
  title: string;
  content: string;
  image?: File | null;
}

export async function submitDiary(
  { title, content, image }: CreateDiaryRequest,
  token: string
) {
  const formData = new FormData();

  formData.append(
    "request",
    new Blob([JSON.stringify({ title, content })], {
      type: "application/json",
    })
  );

  if (image) {
    formData.append("image", image);
  }

  const response = await fetch("/api/diary", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`[일기 작성 실패] ${response.status}`);
  }

  const data = await response.json();
  return data.result; // ✅ 이게 diaryId 구조에 더 맞을 수 있음
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