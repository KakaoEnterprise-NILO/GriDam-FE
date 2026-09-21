import {
  getEmotionCardByDate,
  type EmotionCardByDateResponse,
} from "@/services/emotionCardService";
import type { Feed } from "@/services/feedService";

const MAX_CONCURRENT_CARD_REQUESTS = 4;

export async function getFeedEmotionCards(
  feeds: Feed[],
): Promise<Map<string, EmotionCardByDateResponse | null>> {
  const dates = [...new Set(feeds.map((feed) => feed.createdAt.split("T")[0]))];
  const cardsByDate = new Map<string, EmotionCardByDateResponse | null>();
  let nextDateIndex = 0;

  const loadNextDates = async () => {
    while (nextDateIndex < dates.length) {
      const date = dates[nextDateIndex++];
      try {
        cardsByDate.set(date, await getEmotionCardByDate(date));
      } catch (error: unknown) {
        console.warn(`감정카드 불러오기 실패 (${date}):`, error);
        cardsByDate.set(date, null);
      }
    }
  };

  // Only the workers run in parallel, never the entire list of dates.
  await Promise.all(
    Array.from(
      { length: Math.min(MAX_CONCURRENT_CARD_REQUESTS, dates.length) },
      loadNextDates,
    ),
  );

  return cardsByDate;
}
