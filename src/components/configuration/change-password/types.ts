import type React from "react";

export interface ChangePasswordFormProps {
  onBack: () => void;
  onSuccess?: () => void;
}
export interface PasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export type PasswordFieldName = keyof PasswordFormValues;
export interface PasswordFieldProps {
  id: PasswordFieldName;
  label: string;
  placeholder: string;
  value: string;
  visible: boolean;
  isLoading: boolean;
  minLength?: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleVisibility: () => void;
}
