import { Eye, EyeOff } from "lucide-react";
import type { PasswordFieldProps } from "./types";
export default function PasswordField({
  id,
  label,
  placeholder,
  value,
  visible,
  isLoading,
  minLength,
  onChange,
  onToggleVisibility,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>
      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
          placeholder={placeholder}
          required
          minLength={minLength}
          disabled={isLoading}
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          disabled={isLoading}
        >
          {visible ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}
