"use client"

import type React from "react"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { changePassword, type ChangePasswordRequest } from "@/api/user"
import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/api/axios";

interface ChangePasswordFormProps {
  onBack: () => void
  onSuccess?: () => void
}

export default function ChangePasswordForm({ onBack, onSuccess }: ChangePasswordFormProps) {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

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

        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })

        onSuccess?.()
        onBack()
      } else {
        alert(response.message || "비밀번호 변경에 실패했습니다.")
      }
    } catch (error: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(error) ? error.response : undefined
      console.error("비밀번호 변경 에러:", error)

      if (errorResponse?.data?.message) {
        alert(errorResponse.data.message)
      } else if (errorResponse?.status === 400) {
        alert("현재 비밀번호가 올바르지 않습니다.")
      } else if (errorResponse?.status === 401) {
        alert("인증이 필요합니다. 다시 로그인해주세요.")
      } else {
        alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow max-w-3xl mx-auto px-4 md:px-8 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          disabled={isLoading}
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>뒤로가기</span>
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">비밀번호 변경</h1>

        <form onSubmit={handlePasswordSubmit} className="space-y-6">
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
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

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
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

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
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                disabled={isLoading}
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {passwordForm.confirmPassword && passwordForm.newPassword !== passwordForm.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">비밀번호가 일치하지 않습니다.</p>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-xl">
            <h3 className="text-sm font-medium text-gray-700 mb-2">비밀번호 요구사항:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• 8자 이상</li>
              <li>• 영문, 숫자, 특수문자 조합 권장</li>
              <li>• 이전 비밀번호와 다른 비밀번호</li>
            </ul>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={onBack}
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
}
