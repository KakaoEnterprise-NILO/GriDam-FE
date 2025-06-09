// services/feedService.ts
import api from "@/api/axios"; // ✅ 커스텀 axios 인스턴스

// ✅ 수정된 피드 업로드 API
export const uploadFeed = async (
  emotionCardId: number,
  content: string,
  isPublic: boolean
) => {
  try {
    const res = await api.post(`/feed/upload/${emotionCardId}`, {
      content,
      public: isPublic,
    });
    console.log("🆙 피드 업로드 완료:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 피드 업로드 실패:", err);
    throw err;
  }
};

// 특정 사용자 피드 리스트 조회
export async function getUserFeedList(userId: string) {
  const res = await api.get(`/feed/user/${userId}`);

  console.log("📦 전체 피드 응답 데이터:", res.data);
  console.log("📝 feedList:", res.data.result.feedList);

  return res.data.result.feedList;
}

// ✅ 피드 삭제 API (토큰은 axios 인스턴스에서 자동 처리)
export const deleteFeed = async (feedId: number) => {
  try {
    const res = await api.delete(`/feed/${feedId}`);
    console.log("🗑️ 피드 삭제 완료:", res.data);
    return res.data;
  } catch (err) {
    console.error("❌ 피드 삭제 API 실패:", err);
    throw err;
  }
};

export const getFeedDetail = async (feedId: number, userId: string) => {
  console.log("📩 피드 상세 요청:", { feedId, userId });

  const res = await api.get(`/feed/${feedId}`, {
    params: { userId },
  });

  console.log("📦 피드 상세 응답:", res.data);

  return res.data.result; // { id, content, emotionCardId, createdAt, ... }
};