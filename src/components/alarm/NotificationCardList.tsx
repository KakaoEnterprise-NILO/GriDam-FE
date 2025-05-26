import { useEffect, useRef, useState, useCallback } from "react";
import NotificationCard from "./NotificationCard";
import peacefulImg from "@/assets/picture/peaceful.png";

interface Notification {
  title: string;
  message: string;
  time: string;
  image: string;
}

export default function NotificationList() {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(0);

  // 페이징 로딩 함수
  const loadMoreNotifications = useCallback(() => {
    const newNotifications: Notification[] = Array.from({ length: 4 }, (_, i) => ({
      title: "user 님이 댓글을 달았습니다",
      message: "안녕하세요, 나는 너와 소통하고 싶다",
      time: "05/04 15:43",
      image: peacefulImg,
    }));

    setNotifications((prev) => [...prev, ...newNotifications]);
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    // 첫 로딩
    loadMoreNotifications();
  }, [loadMoreNotifications]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreNotifications();
        }
      },
      { threshold: 1.0 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMoreNotifications]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md h-[22rem] overflow-y-auto">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        안 읽은 알람
      </h2>

      <div className="space-y-2">
        {notifications.map((n, idx) => (
          <NotificationCard
            key={idx}
            imageSrc={n.image}
            title={n.title}
            message={n.message}
            time={n.time}
          />
        ))}
        {/* 무한스크롤 대상 */}
        <div ref={observerRef} className="h-4" />
      </div>
    </div>
  );
}
