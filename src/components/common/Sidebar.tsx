import { useLocation, Link } from 'react-router-dom';
import { sidebarItems } from '../../styles/sidebarItem';
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
    <aside className="w-64 h-[50em] bg-white rounded-2xl shadow-lg px-6 py-8 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12">
          <img src="/logo.png" alt="Logo" className="w-10 h-10" />
          <span className="text-xl font-bold text-gray-800">GriDam</span>
        </div>

        {/* Menu */}
        <ul className="flex flex-col gap-2">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = location.pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  to={item.href}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 rounded-xl transition',
                    isActive
                      ? 'bg-white shadow-md'
                      : 'hover:bg-gray-100'
                  )}
                >
                  <div
                    className={cn(
                      'p-2 rounded-md',
                      isActive ? 'bg-blue-500' : ''
                    )}
                  >
                    <Icon
                      size={20}
                      className={cn(
                        isActive ? 'stroke-white' : 'stroke-blue-500'
                      )}
                    />
                  </div>
                  <span
                    className={cn(
                      'text-sm',
                      isActive ? 'text-gray-800 font-bold' : 'text-gray-800'
                    )}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Settings */}
      <div className="pt-8 border-t border-gray-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-blue-600 hover:bg-gray-100 rounded-xl transition">
          <Settings size={20} />
          <span className="text-sm font-medium">설정</span>
        </button>
      </div>
    </aside>
  );
}
