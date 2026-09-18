import { useCallback, useEffect, useRef, useState } from "react";

export interface EmotionWordCloud {
  emotion: string;
  url: string;
}
export interface UserInfo {
  userId: string;
  userName: string;
  diaryCount: number;
  followerCount: number;
}
const sampleUserInfo: UserInfo = {
  userId: "user123",
  userName: "김범진",
  diaryCount: 1,
  followerCount: 3,
};
const sampleWordClouds: EmotionWordCloud[] = [
  { emotion: "행복", url: "/wordcloud.png" },
  { emotion: "불안", url: "/wordcloud2.png" },
  { emotion: "화남", url: "/wordcloud3.png" },
  { emotion: "기쁨", url: "/wordcloud.png" },
  { emotion: "슬픔", url: "/wordcloud.png" },
  { emotion: "놀람", url: "/wordcloud.png" },
  { emotion: "역겨움", url: "/wordcloud.png" },
  { emotion: "두려움", url: "/wordcloud.png" },
];
function waitForDelay(
  milliseconds: number,
  signal: AbortSignal,
): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve();
      return;
    }
    const finish = () => {
      clearTimeout(timeout);
      signal.removeEventListener("abort", finish);
      resolve();
    };
    const timeout = setTimeout(finish, milliseconds);
    signal.addEventListener("abort", finish, { once: true });
  });
}
export function useWordCloudStatistics() {
  const lifecycleRef = useRef<AbortController | null>(null);
  const [wordClouds, setWordClouds] = useState<EmotionWordCloud[]>([]);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generatedAt, setGeneratedAt] = useState("");
  const [nextGeneration, setNextGeneration] = useState("");
  const fetchUserInfo = useCallback(async () => {
    const signal = lifecycleRef.current?.signal;
    if (!signal || signal.aborted) return null;
    try {
      await waitForDelay(500, signal);
      if (signal.aborted) return null;
      setUserInfo(sampleUserInfo);
      return sampleUserInfo.userId;
    } catch (error) {
      console.error("사용자 정보 불러오기 실패:", error);
      return null;
    }
  }, []);
  const fetchWordCloud = useCallback(async () => {
    const signal = lifecycleRef.current?.signal;
    if (!signal || signal.aborted) return;
    try {
      setLoading(true);
      await waitForDelay(1000, signal);
      if (signal.aborted) return;
      setWordClouds(sampleWordClouds);
      setGeneratedAt(new Date().toISOString());
      const next = new Date();
      next.setHours(next.getHours() + 24);
      setNextGeneration(next.toISOString());
    } catch (error) {
      console.error("워드클라우드 불러오기 실패:", error);
    } finally {
      if (!signal.aborted) setLoading(false);
    }
  }, []);
  const handleGenerateWordCloud = async () => {
    const signal = lifecycleRef.current?.signal;
    if (!signal || signal.aborted) return;
    try {
      setGenerating(true);
      let userId: string | null | undefined;
      if (!userInfo) {
        userId = await fetchUserInfo();
        if (signal.aborted) return;
        if (!userId) {
          console.error("사용자 ID를 가져올 수 없습니다");
          return;
        }
      }
      await waitForDelay(2000, signal);
      if (signal.aborted) return;
      const shuffled = [...sampleWordClouds].sort(() => 0.5 - Math.random());
      setWordClouds(shuffled.slice(0, Math.floor(Math.random() * 4) + 3));
      setGeneratedAt(new Date().toISOString());
      const next = new Date();
      next.setHours(next.getHours() + 24);
      setNextGeneration(next.toISOString());
    } catch (error) {
      console.error("워드클라우드 생성 실패:", error);
    } finally {
      if (!signal.aborted) setGenerating(false);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    lifecycleRef.current = controller;
    const initialize = async () => {
      await fetchUserInfo();
      if (controller.signal.aborted) return;
      await fetchWordCloud();
    };
    initialize();
    return () => controller.abort();
  }, [fetchUserInfo, fetchWordCloud]);
  return {
    wordClouds,
    userInfo,
    loading,
    generating,
    generatedAt,
    nextGeneration,
    fetchWordCloud,
    handleGenerateWordCloud,
  };
}
