// components/common/DeleteConfirmModal.tsx
import React from "react";

interface DeleteConfirmModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-[22rem] text-center">
        <p className="text-gray-800 text-lg mb-4">정말 삭제하시겠습니까?</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 text-sm rounded-full bg-gray-200 hover:bg-gray-300"
            onClick={onCancel}
          >
            취소
          </button>
          <button
            className="px-4 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600"
            onClick={onConfirm}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}
