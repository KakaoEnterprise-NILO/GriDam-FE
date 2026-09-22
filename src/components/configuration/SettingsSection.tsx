import SettingsItem, {
  ConfigurationIcon,
  type ConfigurationIconName,
} from "./SettingsItem"

export interface SettingsSectionItem {
  icon: ConfigurationIconName
  label: string
  value?: string
  action?: boolean
  onClick?: () => void
}

interface SettingsSectionProps {
  icon: ConfigurationIconName
  title: string
  items: SettingsSectionItem[]
}

export default function SettingsSection({ icon, title, items }: SettingsSectionProps) {
  return (
    <section className="overflow-hidden rounded-2xl bg-white shadow">
      <div className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
        <ConfigurationIcon name={icon} className="h-5 w-5 text-white" />
        <h2 className="font-medium text-white">{title}</h2>
      </div>
      <div>
        {items.map((item) => (
          <SettingsItem key={item.label} {...item} />
        ))}
      </div>
    </section>
  )
}
