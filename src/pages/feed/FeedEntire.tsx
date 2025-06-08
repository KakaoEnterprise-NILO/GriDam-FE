import MainLayout from "@/components/common/MainLayout";
import EmotionCardPost2 from "@/components/feed/EmotionCardPost2";

export default function FeedEntire() {

  return (
    <MainLayout>
      <div className="flex justify-center items-start min-h-screen mt-16">
        <EmotionCardPost2 />
      </div>
    </MainLayout>
  );
}
