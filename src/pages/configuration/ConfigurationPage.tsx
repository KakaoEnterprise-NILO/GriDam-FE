"use client"

import { useState } from "react"
import MainLayout from "../../components/common/MainLayout"
import { User, Bell, Lock, Phone, MessageSquare, FileText, HelpCircle } from "lucide-react"
import { SettingsIcon } from "lucide-react"

export default function Settings() {
  const [userInfo, setUserInfo] = useState({
    username: "UserUser",
    email: "user@gmail.com",
    avatar: "/placeholder.svg?height=80&width=80",
  })

  const personalInfoItems = [
    { icon: User, label: "아이디", value: userInfo.username },
    { icon: Lock, label: "비밀번호 변경", action: true },
    { icon: Phone, label: "전화 번호", action: true },
  ]

  const feedManagementItems = [
    { icon: MessageSquare, label: "댓글", action: true },
    { icon: FileText, label: "이용 제한 내역", action: true },
    { icon: SettingsIcon, label: "이용 규칙", action: true },
  ]

  const supportItems = [
    { icon: Bell, label: "공지사항", action: true },
    { icon: HelpCircle, label: "고객 센터", action: true },
  ]

  return (
    <MainLayout>
      <div className="w-full bg-white rounded-2xl shadow max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 왼쪽 프로필 섹션 */}
          <div className="lg:col-span-1">
            <div className="flex flex-col items-center space-y-4">
              {/* 프로필 이미지 */}
              <div className="w-24 h-24 bg-gray-200 rounded-2xl flex items-center justify-center overflow-hidden">
                <img src={userInfo.avatar || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
              </div>

              {/* 사용자 정보 */}
              <div className="text-center">
                <h2 className="text-xl font-bold text-gray-800">{userInfo.username}</h2>
                <p className="text-gray-500 text-sm">{userInfo.email}</p>
              </div>

              {/* 공지사항 버튼 */}
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-xl font-medium transition-colors">
                공지사항
              </button>
            </div>

            {/* 메뉴 리스트 */}
            <div className="mt-8 space-y-2">
              <div className="py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                내 프로필
              </div>
              <div className="py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                피드 관리
              </div>
              <div className="py-3 px-4 text-gray-700 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                이용 안내
              </div>
            </div>
          </div>

          {/* 오른쪽 설정 섹션 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 개인 정보 섹션 */}
            <div>
              <div className="bg-blue-500 text-white py-3 px-4 rounded-t-xl font-medium">개인 정보</div>
              <div className="bg-white border border-t-0 rounded-b-xl">
                {personalInfoItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    {item.action && (
                      <div className="text-gray-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    )}
                    {item.value && !item.action && <span className="text-gray-500 text-sm">{item.value}</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* 피드 관리 섹션 */}
            <div>
              <div className="bg-blue-500 text-white py-3 px-4 rounded-t-xl font-medium">피드 관리</div>
              <div className="bg-white border border-t-0 rounded-b-xl">
                {feedManagementItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 피드 관리 (지원) 섹션 */}
            <div>
              <div className="bg-blue-500 text-white py-3 px-4 rounded-t-xl font-medium">피드 관리</div>
              <div className="bg-white border border-t-0 rounded-b-xl">
                {supportItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 px-4 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">{item.label}</span>
                    </div>
                    <div className="text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
