type UploadFeedResponse = {
  result: {
    // 반환되는 데이터 구조에 따라 구체적으로 작성
    feedId: number;
    message: string;
  };
};

export async function uploadFeed(
  emotionCardId: number,
  content: string,
  isPublic: boolean,
  token: string
) {
  const response = await fetch(`https://gridam.store/api/feed/upload/${emotionCardId}`, {
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

  const data = (await response.json()) as UploadFeedResponse;

  return data.result;
}
