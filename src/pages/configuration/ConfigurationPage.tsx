"use client"
import ChangePasswordForm from "../../components/configuration/ChangePassword"
import { useState } from "react"
import MainLayout from "../../components/common/MainLayout"
import {
  User,
  Bell,
  Lock,
  Phone,
  MessageSquare,
  FileText,
  HelpCircle,
  Settings,
  Shield,
  BookOpen,
  ChevronRight,
} from "lucide-react"


export default function SettingsPage() {
  const [currentView, setCurrentView] = useState<"settings" | "changePassword">("settings")
  const [activeTab, setActiveTab] = useState<"personal" | "feed" | "support">("personal")

  const personalInfoItems = [
    { icon: User, label: "아이디", value: "UserUser" },
    { icon: Lock, label: "비밀번호 변경", action: true, onClick: () => setCurrentView("changePassword") },
    { icon: Phone, label: "전화 번호", action: true },
  ]

  const feedManagementItems = [
    { icon: MessageSquare, label: "댓글", action: true },
    { icon: FileText, label: "이용 제한 내역", action: true },
    { icon: Settings, label: "이용 규칙", action: true },
  ]

  const supportItems = [
    { icon: Bell, label: "공지사항", action: true },
    { icon: HelpCircle, label: "고객 센터", action: true },
  ]


  const renderSettingsView = () => (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">환경설정</h1>
        <p className="text-gray-500 mt-1">계정 및 앱 설정을 관리하세요</p>
      </div>

      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("personal")}
          className={`px-4 py-3 font-medium text-sm transition-colors ${
            activeTab === "personal" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          개인 정보
        </button>
        <button
          onClick={() => setActiveTab("feed")}
          className={`px-4 py-3 font-medium text-sm transition-colors ${
            activeTab === "feed" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          피드 관리
        </button>
        <button
          onClick={() => setActiveTab("support")}
          className={`px-4 py-3 font-medium text-sm transition-colors ${
            activeTab === "support" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-600 hover:text-gray-800"
          }`}
        >
          지원
        </button>
      </div>

      <div className="space-y-6">
        {activeTab === "personal" && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-white mr-2" />
                <h2 className="text-white font-medium">개인 정보</h2>
              </div>
            </div>
            <div>
              {personalInfoItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 px-6 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={item.onClick}
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </div>
                  {item.action ? (
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  ) : (
                    <span className="text-gray-500 text-sm">{item.value}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "feed" && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6">
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-white mr-2" />
                <h2 className="text-white font-medium">피드 관리</h2>
              </div>
            </div>
            <div>
              {feedManagementItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 px-6 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "support" && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 py-4 px-6">
              <div className="flex items-center">
                <BookOpen className="w-5 h-5 text-white mr-2" />
                <h2 className="text-white font-medium">지원</h2>
              </div>
            </div>
            <div>
              {supportItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 px-6 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-50 p-2 rounded-lg">
                      <item.icon className="w-5 h-5 text-blue-500" />
                    </div>
                    <span className="text-gray-700 font-medium">{item.label}</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
          <h3 className="text-blue-800 font-medium mb-2">도움이 필요하신가요?</h3>
          <p className="text-blue-700 text-sm mb-4">설정에 관한 질문이 있으시면 고객 센터에 문의하세요.</p>
          <button className="bg-white text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 text-sm font-medium transition-colors">
            고객 센터 방문하기
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <MainLayout>
      <div className="px-4 py-8 bg-gray-50 min-h-screen">
        {currentView === "settings" ? (
          renderSettingsView()
        ) : (
          <ChangePasswordForm onBack={() => setCurrentView("settings")} />
        )}
      </div>
    </MainLayout>
  )
}
