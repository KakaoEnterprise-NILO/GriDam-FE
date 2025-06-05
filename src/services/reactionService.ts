import axios from "axios";

export async function toggleReaction(feedId: number, reactionType: string, token: string) {
  const res = await axios.post(
    `/api/feed/${feedId}/reaction`,
    { reactionType },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return res.data.result;
}
