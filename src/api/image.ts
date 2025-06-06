type UploadImageResponse = {
  result: {
    imageUrl: string;
    [key: string]: any;
  };
};

export async function uploadImageToServer(file: File, token: string) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("/api/image/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`[이미지 업로드 실패] ${response.status}`);
  }

  const data = (await response.json()) as UploadImageResponse;

  return data.result; // { imageUrl: "...", ... }
}
