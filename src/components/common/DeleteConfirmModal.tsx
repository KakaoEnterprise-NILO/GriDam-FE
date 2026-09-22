import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface DeleteConfirmModalProps {
  onCancel: () => void
  onConfirm: () => void | Promise<void>
}

export default function DeleteConfirmModal({ onCancel, onConfirm }: DeleteConfirmModalProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleConfirm = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    try {
      await onConfirm()
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open onOpenChange={(open) => !open && !isDeleting && onCancel()}>
      <DialogContent
        showClose={!isDeleting} className="w-[22rem] text-center"
        onEscapeKeyDown={(event) => { if (isDeleting) event.preventDefault() }}
        onPointerDownOutside={(event) => { if (isDeleting) event.preventDefault() }}
        onInteractOutside={(event) => { if (isDeleting) event.preventDefault() }}
      >
        <DialogHeader>
          <DialogTitle>이 일기를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="sr-only">삭제한 일기는 복구할 수 없습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center gap-4 sm:justify-center">
          <button type="button" className="px-4 py-2 text-sm rounded-full bg-gray-200 hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50" onClick={onCancel} disabled={isDeleting}>
            취소
          </button>
          <button type="button" className="px-4 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50" onClick={handleConfirm} disabled={isDeleting} aria-busy={isDeleting}>
            {isDeleting ? "삭제 중..." : "삭제"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
