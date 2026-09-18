"use client";

import { ArrowLeft } from "lucide-react";
import { useChangePassword } from "./change-password/useChangePassword";
import PasswordField from "./change-password/PasswordField";
import PasswordRequirements from "./change-password/PasswordRequirements";
import type { ChangePasswordFormProps } from "./change-password/types";

export default function ChangePasswordForm({
  onBack,
  onSuccess,
}: ChangePasswordFormProps) {
  const state = useChangePassword(onBack, onSuccess);
  const {
    passwordForm,
    isLoading,
    handlePasswordChange,
    handlePasswordSubmit,
  } = state;
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
        <h1 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          비밀번호 변경
        </h1>
        <form onSubmit={handlePasswordSubmit} className="space-y-6">
          <PasswordField
            id="currentPassword"
            label="현재 비밀번호"
            placeholder="현재 비밀번호를 입력하세요"
            value={passwordForm.currentPassword}
            visible={state.showCurrentPassword}
            isLoading={isLoading}
            onChange={(e) =>
              handlePasswordChange("currentPassword", e.target.value)
            }
            onToggleVisibility={() =>
              state.setShowCurrentPassword(!state.showCurrentPassword)
            }
          />
          <PasswordField
            id="newPassword"
            label="새 비밀번호"
            placeholder="새 비밀번호를 입력하세요 (8자 이상)"
            value={passwordForm.newPassword}
            visible={state.showNewPassword}
            isLoading={isLoading}
            minLength={8}
            onChange={(e) =>
              handlePasswordChange("newPassword", e.target.value)
            }
            onToggleVisibility={() =>
              state.setShowNewPassword(!state.showNewPassword)
            }
          />
          <PasswordField
            id="confirmPassword"
            label="새 비밀번호 확인"
            placeholder="새 비밀번호를 다시 입력하세요"
            value={passwordForm.confirmPassword}
            visible={state.showConfirmPassword}
            isLoading={isLoading}
            onChange={(e) =>
              handlePasswordChange("confirmPassword", e.target.value)
            }
            onToggleVisibility={() =>
              state.setShowConfirmPassword(!state.showConfirmPassword)
            }
          />
          {passwordForm.confirmPassword &&
            passwordForm.newPassword !== passwordForm.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
          <PasswordRequirements />
          <div className="flex space-x-4">
            <button
              type="button"
              disabled={isLoading}
              onClick={onBack}
              className={`flex-1 py-3 px-6 border border-gray-300 rounded-xl transition-colors font-medium ${isLoading ? "text-gray-400 cursor-not-allowed bg-gray-50" : "text-gray-700 hover:bg-gray-50"}`}
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 py-3 px-6 rounded-xl transition-colors font-medium flex items-center justify-center ${isLoading ? "bg-gray-400 cursor-not-allowed text-white" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
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
  );
}
