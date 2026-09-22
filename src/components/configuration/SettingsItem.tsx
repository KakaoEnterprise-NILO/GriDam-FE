import type { LucideIcon } from "lucide-react"
import {
  Bell,
  BookOpen,
  ChevronRight,
  FileText,
  HelpCircle,
  Lock,
  MessageSquare,
  Phone,
  Settings,
  Shield,
  User,
} from "lucide-react"

export type ConfigurationIconName =
  | "bell"
  | "book-open"
  | "file-text"
  | "help-circle"
  | "lock"
  | "message-square"
  | "phone"
  | "settings"
  | "shield"
  | "user"

const iconMap: Record<ConfigurationIconName, LucideIcon> = {
  bell: Bell,
  "book-open": BookOpen,
  "file-text": FileText,
  "help-circle": HelpCircle,
  lock: Lock,
  "message-square": MessageSquare,
  phone: Phone,
  settings: Settings,
  shield: Shield,
  user: User,
}

export function ConfigurationIcon({ name, className }: { name: ConfigurationIconName; className?: string }) {
  const Icon = iconMap[name]
  return <Icon className={className} aria-hidden="true" />
}

interface SettingsItemProps {
  icon: ConfigurationIconName
  label: string
  value?: string
  action?: boolean
  onClick?: () => void
}

export default function SettingsItem({ icon, label, value, action, onClick }: SettingsItemProps) {
  const content = (
    <>
      <span className="flex items-center gap-3">
        <span className="rounded-lg bg-blue-50 p-2">
          <ConfigurationIcon name={icon} className="h-5 w-5 text-blue-500" />
        </span>
        <span className="font-medium text-gray-700">{label}</span>
      </span>
      {action ? (
        <ChevronRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
      ) : (
        <span className="text-sm text-gray-500">{value}</span>
      )}
    </>
  )

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center justify-between border-b px-6 py-4 text-left transition-colors last:border-b-0 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
      >
        {content}
      </button>
    )
  }

  return (
    <div className="flex items-center justify-between border-b px-6 py-4 last:border-b-0">
      {content}
    </div>
  )
}
