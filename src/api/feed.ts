export async function uploadFeed(emotionCardId: number, content: string, isPublic: boolean, token: string) {
  const response = await fetch(`/api/feed/upload/${emotionCardId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content,
      public: isPublic,
    }),
  });

  if (!response.ok) {
    throw new Error(`[피드 업로드 실패] ${response.status}`);
  }

  const data = await response.json();
  return data.result;
}
