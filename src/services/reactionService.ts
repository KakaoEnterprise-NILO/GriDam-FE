import api from "@/api/axios";

export const toggleReaction = async (
  feedId: number,
  reactionType: string
) => {

  const res = await api.post(`/feed/${feedId}/reaction`, {
    reactionType,
  });


  return res.data;
};
