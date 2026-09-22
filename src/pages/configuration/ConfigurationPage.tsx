import { useState } from "react"
import ChangePasswordForm from "@/components/configuration/ChangePassword"
import SettingsSection, {
  type SettingsSectionItem,
} from "@/components/configuration/SettingsSection"
import MainLayout from "@/components/common/MainLayout"

type SettingsView = "settings" | "changePassword"
type SettingsTab = "personal" | "feed" | "support"

const tabs: { id: SettingsTab; label: string }[] = [
  { id: "personal", label: "개인 정보" },
  { id: "feed", label: "피드 관리" },
  { id: "support", label: "지원" },
]

export default function ConfigurationPage() {
  const [currentView, setCurrentView] = useState<SettingsView>("settings")
  const [activeTab, setActiveTab] = useState<SettingsTab>("personal")

  const personalInfoItems: SettingsSectionItem[] = [
    { icon: "user", label: "아이디", value: "UserUser" },
    {
      icon: "lock",
      label: "비밀번호 변경",
      action: true,
      onClick: () => setCurrentView("changePassword"),
    },
    { icon: "phone", label: "전화 번호", action: true },
  ]

  const feedManagementItems: SettingsSectionItem[] = [
    { icon: "message-square", label: "댓글", action: true },
    { icon: "file-text", label: "이용 제한 내역", action: true },
    { icon: "settings", label: "이용 규칙", action: true },
  ]

  const supportItems: SettingsSectionItem[] = [
    { icon: "bell", label: "공지사항", action: true },
    { icon: "help-circle", label: "고객 센터", action: true },
  ]

  const renderSettingsView = () => (
    <div className="mx-auto w-full max-w-3xl">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">환경설정</h1>
        <p className="mt-1 text-gray-500">계정 및 앱 설정을 관리하세요</p>
      </header>

      <div className="mb-6 flex border-b" role="tablist" aria-label="설정 분류">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {activeTab === "personal" && (
          <SettingsSection
            icon="shield"
            title="개인 정보"
            items={personalInfoItems}
          />
        )}
        {activeTab === "feed" && (
          <SettingsSection
            icon="message-square"
            title="피드 관리"
            items={feedManagementItems}
          />
        )}
        {activeTab === "support" && (
          <SettingsSection
            icon="book-open"
            title="지원"
            items={supportItems}
          />
        )}

        <section className="rounded-2xl bg-gradient-to-r from-blue-50 to-blue-100 p-6">
          <h2 className="mb-2 font-medium text-blue-800">도움이 필요하신가요?</h2>
          <p className="mb-4 text-sm text-blue-700">
            설정에 관한 질문이 있으시면 고객 센터에 문의하세요.
          </p>
          <button
            type="button"
            className="rounded-xl border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            고객 센터 방문하기
          </button>
        </section>
      </div>
    </div>
  )

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        {currentView === "settings" ? (
          renderSettingsView()
        ) : (
          <ChangePasswordForm onBack={() => setCurrentView("settings")} />
        )}
      </div>
    </MainLayout>
  )
}
