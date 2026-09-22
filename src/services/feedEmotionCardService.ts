import {
  getEmotionCardByDate,
  type EmotionCardByDateResponse,
} from "@/services/emotionCardService";
import type { Feed } from "@/api/feed";

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

  // 모든 날짜를 한꺼번에 요청하지 않고 worker 수만큼만 병렬로 처리한다.
  await Promise.all(
    Array.from(
      { length: Math.min(MAX_CONCURRENT_CARD_REQUESTS, dates.length) },
      loadNextDates,
    ),
  );

  return cardsByDate;
}
