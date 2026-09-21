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
  onConfirm: () => void
}

export default function DeleteConfirmModal({ onCancel, onConfirm }: DeleteConfirmModalProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && onCancel()}>
      <DialogContent
        className="w-[22rem] text-center [&>button]:hidden"
        onEscapeKeyDown={(event) => event.preventDefault()}
        onPointerDownOutside={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>이 일기를 삭제하시겠습니까?</DialogTitle>
          <DialogDescription className="sr-only">삭제한 일기는 복구할 수 없습니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center gap-4 sm:justify-center">
          <button className="px-4 py-2 text-sm rounded-full bg-gray-200 hover:bg-gray-300" onClick={onCancel}>
            취소
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
            삭제
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
