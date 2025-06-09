// services/reactionService.ts
import api from "@/api/axios"; // ✅ 커스텀 axios 인스턴스 import

export const toggleReaction = async (
  feedId: number,
  reactionType: string
) => {
  console.log(`📤 [toggleReaction] Sending reaction: ${reactionType} to feedId: ${feedId}`);
  
  const res = await api.post(`/feed/${feedId}/reaction`, {
    reactionType,
  });

  console.log("✅ [toggleReaction] Response:", res.data);

  return res.data;
};
