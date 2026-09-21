import { useState, useEffect, useRef } from "react";
import MainLayout from "@/components/common/MainLayout";
import EmotionCardFeedItem from "@/components/feed/EmotionCardFeedItem";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getMyUserId } from "@/services/userService";
import { getUserFeedList, type Feed } from "@/services/feedService";
import type { EmotionCardByDateResponse } from "@/services/emotionCardService";
import { getFeedEmotionCards } from "@/services/feedEmotionCardService";

export default function FeedList() {
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const [emotionCardMap, setEmotionCardMap] = useState<
    Map<string, EmotionCardByDateResponse | null>
  >(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [requestVersion, setRequestVersion] = useState(0);
  const loadingRef = useRef(true);

  // Share requests across effect re-runs (including StrictMode), scoped to this page.
  const feedRequestRef = useRef<Promise<Feed[]> | null>(null);
  const cardRequestRef = useRef<
    Promise<Map<string, EmotionCardByDateResponse | null>> | null
  >(null);

  useEffect(() => {
    let active = true;

    const loadInitialFeed = async () => {
      try {
        feedRequestRef.current ??= getMyUserId().then(getUserFeedList);
        const feeds = await feedRequestRef.current;
        if (!active) return;

        cardRequestRef.current ??= getFeedEmotionCards(feeds);
        const cardsByDate = await cardRequestRef.current;
        if (!active) return;

        setFeedList(feeds);
        setEmotionCardMap(cardsByDate);
        setError(null);
        feedRequestRef.current = null;
        cardRequestRef.current = null;
      } catch (error: unknown) {
        if (!active) return;
        console.error("피드 불러오기 실패:", error);
        setError("피드를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.");
      } finally {
        if (active) {
          loadingRef.current = false;
          setLoading(false);
        }
      }
    };

    void loadInitialFeed();
    return () => {
      active = false;
    };
  }, [requestVersion]);

  const handleRetry = () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    feedRequestRef.current = null;
    cardRequestRef.current = null;
    setError(null);
    setLoading(true);
    setRequestVersion((version) => version + 1);
  };

  return (
    <MainLayout>
      <div className="relative z-20">
        <div className="flex flex-1 justify-center items-start overflow-y-auto px-6 py-6">
          <div className="w-full max-w-2xl space-y-6">
            {loading ? (
              <div role="status" aria-live="polite" className="space-y-4">
                <p className="text-center text-muted-foreground">피드를 불러오는 중...</p>
                <Skeleton className="h-64 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            ) : error ? (
              <div className="flex flex-col items-center py-8">
                <Alert>
                  <AlertDescription className="text-center">{error}</AlertDescription>
                </Alert>
                <Button
                  variant="outline"
                  onClick={handleRetry}
                  disabled={loading}
                  className="mt-4"
                >
                  다시 시도
                </Button>
              </div>
            ) : feedList.length === 0 ? (
              <div role="status" className="py-12 text-center">
                <p className="text-lg font-semibold">아직 피드가 없습니다.</p>
                <p className="mt-2 text-muted-foreground">등록된 피드가 여기에 표시됩니다.</p>
              </div>
            ) : (
              feedList.map((feed) => (
                <EmotionCardFeedItem
                  key={feed.id}
                  feedId={feed.id}
                  content={feed.content}
                  userId={feed.userId}
                  createdAt={feed.createdAt}
                  emotionCard={
                    emotionCardMap.get(feed.createdAt.split("T")[0]) ?? null
                  }
                />
              ))
            )}
            <div className="h-10" />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
