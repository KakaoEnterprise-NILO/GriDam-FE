import NavBar from "../../components/common/Navbar";
import TopBar from "../../components/common/Topbar";
import EmotionCardPost from "../../components/feed/EmotionCardPost";

export default function FriendList() {
  return (
    <div className="flex min-h-screen bg-[#F4F4F4]">
      {/* 좌측 메뉴바 */}
      <aside className="min-h-screen w-64 bg-white border-r shadow-md">
        <NavBar />
      </aside>

      {/* 우측 메인 콘텐츠 */}
      <main className="flex-1 flex flex-col">
        <header className="bg-white px-6 py-4 border-b shadow-sm">
          <TopBar />
        </header>

        <section className="flex-1 overflow-y-auto flex justify-center px-6 py-8">
          <div className="w-full max-w-xl space-y-6">
            <EmotionCardPost />
            <EmotionCardPost />
            <EmotionCardPost />
          </div>
        </section>
      </main>
    </div>
  );
}
