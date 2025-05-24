import { sidebarItems } from '../../styles/SidebarItem';
import { cn } from '@/lib/utils';
import { Home, PlusCircle, User, Users, Calendar, Bell, Settings } from 'lucide-react';

const iconMap = {
  home: Home,
  write: PlusCircle,
  profile: User,
  friends: Users,
  calendar: Calendar,
  alerts: Bell,
  settings: Settings,
};

interface SidebarProps {
  activePage: string;
}

export default function Sidebar({ activePage }: SidebarProps) {
  return (
    <aside className="w-64 h-[760px] bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between">
      {/* 상단 로고 및 메뉴 */}
      <div>
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-gray-800">GriDam</span>
        </div>

        {/* Menu List */}
        <ul className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = item.key === activePage;

            return (
              <li key={item.label}>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition',
                    isActive
                      ? 'bg-blue-100 text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                  )}
                >
                  <Icon
                    size={20}
                    className={cn(
                      'shrink-0',
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    )}
                  />
                  <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* 하단 설정 */}
      <div className="mt-auto mb-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-xl transition">
          <Settings size={20} />
          <span className="text-sm font-medium">설정</span>
        </button>
      </div>
    </aside>
  );
}
