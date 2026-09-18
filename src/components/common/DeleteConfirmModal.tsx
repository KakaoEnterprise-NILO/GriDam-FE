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
          <DialogTitle>뺣쭚 ??젣?섏떆寃좎뒿?덇퉴?</DialogTitle>
          <DialogDescription className="sr-only">삭제할 일기를 확인합니다.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="justify-center gap-4 sm:justify-center">
          <button className="px-4 py-2 text-sm rounded-full bg-gray-200 hover:bg-gray-300" onClick={onCancel}>
            痍⑥냼
          </button>
          <button className="px-4 py-2 text-sm rounded-full bg-red-500 text-white hover:bg-red-600" onClick={onConfirm}>
            ??젣
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
