import { useState, useEffect, useCallback } from "react";
import MainLayout from "@/components/common/MainLayout";
import EmotionCardPost from "@/components/feed/EmotionCardPost";
import { getMyUserId } from "@/services/userService";
import { getUserFeedList, type Feed } from "@/services/feedService";
import { getEmotionCardByDate, type EmotionCardByDateResponse } from "@/services/emotionCardService";

export default function FeedList() {
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const [emotionCardMap, setEmotionCardMap] = useState<Record<number, EmotionCardByDateResponse | null>>({});

  const loadInitialFeed = useCallback(async () => {
    try {
      const userId = await getMyUserId();

      const feeds = await getUserFeedList(userId);
      setFeedList(feeds);

      const emotionData: Record<number, EmotionCardByDateResponse | null> = {};
      for (const feed of feeds) {
        const date = feed.createdAt.split("T")[0];
        try {
          const emotionCard = await getEmotionCardByDate(date);
          emotionData[feed.id] = emotionCard;
        } catch (e) {
          console.warn(`감정카드 불러오기 실패 (${date}):`, e);
        }
      }
      setEmotionCardMap(emotionData);
    } catch (err) {
      console.error("피드 불러오기 실패:", err);
    }
  }, []);

  useEffect(() => {
    loadInitialFeed();
  }, [loadInitialFeed]);

  return (
    <MainLayout>
      <div className="relative z-20">
        <div className="flex flex-1 justify-center items-start overflow-y-auto px-6 py-6">
          <div className="w-full max-w-2xl space-y-6">
            {feedList.map((feed) => (
              <EmotionCardPost
                key={feed.id}
                feedId={feed.id}
                content={feed.content}
                userId={feed.userId}
                createdAt={feed.createdAt}
                emotionCard={emotionCardMap[feed.id] || null}
              />
            ))}
            <div className="h-10" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
