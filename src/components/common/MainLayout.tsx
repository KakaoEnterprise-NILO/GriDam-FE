import Sidebar from './Sidebar';
import Footer from './Footer';
import Topbar from './Topbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen flex flex-col bg-[#F7F8FC]">
      <div className="flex flex-1">
        <aside className="w-64 p-4 ml-8 flex-shrink-0">
          <Sidebar />
        </aside>

        <div className="flex-1 flex flex-col p-6">
          <Topbar />

          <main className="ml-5 bg-[#F7F8FC] rounded-2xl p-10">{children}</main>
        </div>
      </div>

      <Footer />
    </div>
  );
}
