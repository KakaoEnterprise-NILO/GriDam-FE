import { useLocation, Link } from 'react-router-dom';
import { sidebarItems } from '../../styles/Nav';
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

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-200 bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between overflow-hidden">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-gray-800">GriDam</span>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition',
                    isActive
                      ? 'bg-blue-100 text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-blue-600 hover:bg-gray-100'
                  )}
                >
                  <Icon size={20} className="shrink-0" />
                  <span className="text-sm font-medium">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Settings */}
      <div className="mt-10">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-xl transition">
          <Settings size={20} />
          <span className="text-sm font-medium">설정</span>
        </button>
      </div>
    </aside>
  );
}
