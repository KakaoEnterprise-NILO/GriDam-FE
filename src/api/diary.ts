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
  return data;
}
