"use client"

import type React from "react"

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
  ArrowLeft,
  Eye,
  EyeOff,
  Settings,
  Shield,
  BookOpen,
  ChevronRight,
} from "lucide-react"
import { changePassword, type ChangePasswordRequest } from "@/api/user"

export default function SettingsPage() {
  const [currentView, setCurrentView] = useState<"settings" | "changePassword">("settings")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<"personal" | "feed" | "support">("personal")

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

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

  const handlePasswordChange = (field: keyof typeof passwordForm, value: string) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.")
      return
    }

    setIsLoading(true)

    try {
      const requestData: ChangePasswordRequest = {
        password: passwordForm.currentPassword,
        changedPassword: passwordForm.newPassword,
        checkPassword: passwordForm.confirmPassword,
      }

      const response = await changePassword(requestData)

      if (response.success) {
        alert("비밀번호가 성공적으로 변경되었습니다.")

        // 폼 초기화 및 설정 화면으로 돌아가기
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
        setCurrentView("settings")
      } else {
        alert(response.message || "비밀번호 변경에 실패했습니다.")
      }
    } catch (error: any) {
      console.error("비밀번호 변경 에러:", error)

      // 에러 메시지 처리
      if (error.response?.data?.message) {
        alert(error.response.data.message)
      } else if (error.response?.status === 400) {
        alert("현재 비밀번호가 올바르지 않습니다.")
      } else if (error.response?.status === 401) {
        alert("인증이 필요합니다. 다시 로그인해주세요.")
      } else {
        alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const renderPasswordChangeView = () => (
    <div className="w-full bg-white rounded-2xl shadow max-w-3xl mx-auto px-4 md:px-8 py-6">
      {/* 헤더 */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentView("settings")}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>뒤로가기</span>
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">비밀번호 변경</h1>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          {/* 현재 비밀번호 */}
          <div>
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
              현재 비밀번호
            </label>
            <div className="relative">
              <input
                type={showCurrentPassword ? "text" : "password"}
                id="currentPassword"
                value={passwordForm.currentPassword}
                onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="현재 비밀번호를 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 새 비밀번호 */}
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                id="newPassword"
                value={passwordForm.newPassword}
                onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="새 비밀번호를 입력하세요 (8자 이상)"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* 새 비밀번호 확인 */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              새 비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={passwordForm.confirmPassword}
                onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                placeholder="새 비밀번호를 다시 입력하세요"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          {/* 비밀번호 요구사항 안내 */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-medium text-gray-700 mb-2">비밀번호 요구사항:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 8자 이상</li>
              <li>• 영문, 숫자, 특수문자 조합 권장</li>
              <li>• 이전 비밀번호와 다른 비밀번호</li>
            </ul>
          </div>

          {/* 버튼 */}
          <div className="flex space-x-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={() => setCurrentView("settings")}
              className={`flex-1 py-3 px-6 border border-gray-300 rounded-xl transition-colors font-medium ${
                isLoading ? "text-gray-400 cursor-not-allowed bg-gray-50" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 px-6 rounded-xl transition-colors font-medium flex items-center justify-center ${
                isLoading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  변경 중...
                </>
              ) : (
                "변경하기"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const renderSettingsView = () => (
    <div className="w-full max-w-3xl mx-auto">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">환경설정</h1>
        <p className="text-gray-500 mt-1">계정 및 앱 설정을 관리하세요</p>
      </div>

      {/* 탭 네비게이션 */}
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

      {/* 설정 카드 */}
      <div className="space-y-6">
        {/* 개인 정보 설정 */}
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

        {/* 피드 관리 설정 */}
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

        {/* 지원 설정 */}
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

        {/* 추가 정보 카드 */}
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
        {currentView === "settings" ? renderSettingsView() : renderPasswordChangeView()}
      </div>
    </MainLayout>
  )
}
