import Sidebar from './Sidebar';
import Footer from './Footer';
import Topbar from './Topbar';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F7F8FC]">
      <div className="flex min-w-0 flex-1 flex-col md:flex-row">
        <aside className="hidden w-64 flex-shrink-0 p-4 md:ml-8 md:block">
          <Sidebar />
        </aside>
        <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4 md:p-6">
          <Topbar />
          <main className="ml-0 min-w-0 rounded-2xl bg-[#F7F8FC] p-3 sm:p-6 md:ml-5 md:p-10">{children}</main>
        </div>
      </div>
      <Footer />
    </div>
  );
}