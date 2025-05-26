import { useEffect, useRef, useState, useCallback } from "react";
import NotificationCard from "./NotificationCard";
import peacefulImg from "@/assets/picture/peaceful.png"; // 공통 이미지

interface Notification {
  title: string;
  message: string;
  time: string;
  image: string;
}

export default function RecentNotificationList() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [page, setPage] = useState(0);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadMoreNotifications = useCallback(() => {
    const newNotis: Notification[] = Array.from({ length: 3 }, () => ({
      title: "user 님이 댓글을 달았습니다",
      message: "안녕하세요. 나는 너와 소통하고 싶다",
      time: "05/04 15:43",
      image: peacefulImg,
    }));

    setNotifications((prev) => [...prev, ...newNotis]);
    setPage((prev) => prev + 1);
  }, []);

  useEffect(() => {
    loadMoreNotifications(); // 최초 로딩
  }, [loadMoreNotifications]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreNotifications();
        }
      },
      { threshold: 1 }
    );

    const current = observerRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [loadMoreNotifications]);

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md h-[20rem] overflow-y-auto">
      <h2 className="text-base font-semibold text-gray-800 mb-4">
        최근 알람
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
        <div ref={observerRef} className="h-6" />
      </div>
    </div>
  );
}
