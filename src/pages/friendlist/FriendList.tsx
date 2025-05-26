import { useState, useEffect, useRef, useCallback } from "react";
import Sidebar from "../../components/common/Sidebar";
import TopBar from "../../components/common/Topbar";
import EmotionCardPost from "../../components/feed/EmotionCardPost";

export default function FriendList() {
  const [isBlurred, setIsBlurred] = useState(false); // 추후 활용
  const [cards, setCards] = useState<number[]>(Array.from({ length: 6 }, (_, i) => i));
  const [page, setPage] = useState(1);
  const observerRef = useRef<null | HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    setCards((prev) => [
      ...prev,
      ...Array.from({ length: 6 }, (_, i) => prev.length + i),
    ]);
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMore]);

  return (
    <div className="relative min-h-screen bg-[#F5F7FA] flex p-6 overflow-hidden">
      {isBlurred && (
        <div className="absolute inset-0 backdrop-blur-sm bg-gray-600 bg-opacity-10 z-30 transition-opacity duration-300" />
      )}

      <div
        className={`mr-8 mt-4 flex-shrink-0 z-20 transition-all duration-300 ${
          isBlurred ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <Sidebar activePage="friend" />
      </div>

      <div
        className={`flex-1 flex flex-col z-20 transition-all duration-300 ${
          isBlurred ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="mb-4">
          <TopBar />
        </div>

        <div className="flex-1 flex justify-center items-start overflow-y-auto px-6 py-6">
          <div className="w-full max-w-2xl space-y-6">
            {cards.map((id) => (
              <EmotionCardPost key={id} />
            ))}
            {/* 관찰 대상 div */}
            <div ref={observerRef} className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
