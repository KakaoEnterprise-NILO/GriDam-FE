import { sidebarItems } from '../styles/Nav'
import { cn } from '@/lib/utils'
import { Home, PlusCircle, User, Users, Calendar, Bell, Settings } from 'lucide-react'

const iconMap = {
  home: Home,
  write: PlusCircle,
  profile: User,
  friends: Users,
  calendar: Calendar,
  alerts: Bell,
  settings: Settings,
}

export default function Sidebar() {
  return (
    <aside className="w-64 h-[700px] bg-white rounded-2xl shadow p-6 space-y-50 justify-between">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-5 mb-8">
          <img src="/logo.png" alt="Logo" className="ml-2 w-10 h-10" />
          <span className="text-xl font-bold">GriDam</span>
        </div>

        {/* Menu */}
        <ul className="space-y-3">
          {sidebarItems.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <li key={item.label}>
                <button
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-xl transition',
                    item.active
                      ? 'bg-blue-100 text-blue-600 shadow'
                      : 'text-black-400 hover:text-blue-600'
                  )}
                >
                  <Icon size={20} />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Settings */}
      <div className="mt-6">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-blue-600 transition">
          <Settings size={20} />
          <span className="text-sm font-medium">설정</span>
        </button>
      </div>
    </aside>
  )
}
