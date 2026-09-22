import { useState } from "react";
import { isAxiosError } from "axios";
import { changePassword, type ChangePasswordRequest } from "@/api/user";
import type { ApiErrorResponse } from "@/api/axios";
import type { PasswordFieldName, PasswordFormValues } from "./types";

const EMPTY_FORM: PasswordFormValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export function useChangePassword(onBack: () => void, onSuccess?: () => void) {

  const [passwordForm, setPasswordForm] =
    useState<PasswordFormValues>(EMPTY_FORM);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handlePasswordChange = (field: PasswordFieldName, value: string) =>
    setPasswordForm((prev) => ({ ...prev, [field]: value }));
  const handlePasswordSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (passwordForm.newPassword.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }
    setIsLoading(true);
    try {
      const requestData: ChangePasswordRequest = {
        password: passwordForm.currentPassword,
        changedPassword: passwordForm.newPassword,
        checkPassword: passwordForm.confirmPassword,
      };
      const response = await changePassword(requestData);
      if (response.success) {
        alert("비밀번호가 성공적으로 변경되었습니다.");
        setPasswordForm(EMPTY_FORM);
        onSuccess?.();
        onBack();
      } else alert(response.message || "비밀번호 변경에 실패했습니다.");
    } catch (error: unknown) {
      const errorResponse = isAxiosError<ApiErrorResponse>(error)
        ? error.response
        : undefined;
      console.error("비밀번호 변경 에러:", error);
      if (errorResponse?.data?.message) alert(errorResponse.data.message);
      else if (errorResponse?.status === 400)
        alert("현재 비밀번호가 올바르지 않습니다.");
      else if (errorResponse?.status === 401)
        alert("인증이 필요합니다. 다시 로그인해주세요.");
      else alert("비밀번호 변경 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };
  return {
    passwordForm,
    isLoading,
    showCurrentPassword,
    showNewPassword,
    showConfirmPassword,
    setShowCurrentPassword,
    setShowNewPassword,
    setShowConfirmPassword,
    handlePasswordChange,
    handlePasswordSubmit,
  };
}
