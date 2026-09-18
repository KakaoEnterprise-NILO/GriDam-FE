import { IoClose } from "react-icons/io5"
import { FaFacebook, FaWhatsapp, FaXTwitter } from "react-icons/fa6"
import { SiKakaotalk } from "react-icons/si"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"

export default function ShareModal({ onClose, shareUrl }: { onClose: () => void; shareUrl: string }) {
  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white rounded-xl w-[26rem] p-5 relative shadow-lg">
        <DialogTitle className="sr-only">공유</DialogTitle>
        <DialogDescription className="sr-only">일기 공유 방법을 선택하거나 링크를 복사합니다.</DialogDescription>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-black" aria-label="닫기">
          <IoClose size={24} />
        </button>
        <div className="flex justify-around items-center mt-2">
          <div className="flex flex-col items-center text-xs"><SiKakaotalk size={30} className="text-yellow-400" /><span>移댁뭅?ㅽ넚</span></div>
          <div className="flex flex-col items-center text-xs"><FaFacebook size={30} className="text-blue-600" /><span>Facebook</span></div>
          <div className="flex flex-col items-center text-xs"><FaWhatsapp size={30} className="text-green-500" /><span>WhatsApp</span></div>
          <div className="flex flex-col items-center text-xs"><FaXTwitter size={30} /><span>X</span></div>
        </div>
        <div className="mt-5 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
          <input readOnly value={shareUrl} className="flex-1 text-sm bg-transparent outline-none" />
          <button className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full" onClick={() => { navigator.clipboard.writeText(shareUrl); alert("留곹겕媛 蹂듭궗?섏뿀?듬땲??") }}>
            蹂듭궗
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
