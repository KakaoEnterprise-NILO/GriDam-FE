import { useState } from "react";
import { uploadFeed } from "@/api/feed";

export function useFeedUpload() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const upload = async (emotionCardId: number, content: string, isPublic: boolean, token: string) => {
    setLoading(true);
    setError(null);

    try {
      const result = await uploadFeed(emotionCardId, content, isPublic, token);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { upload, loading, error };
}
