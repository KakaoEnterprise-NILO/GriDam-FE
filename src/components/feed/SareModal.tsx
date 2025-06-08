import { IoClose } from "react-icons/io5";
import {
  FaFacebook,
  FaWhatsapp,
  FaXTwitter,
  FaRegCopy,
} from "react-icons/fa6";
import { SiKakaotalk } from "react-icons/si";

export default function ShareModal({
  onClose,
  shareUrl,
}: {
  onClose: () => void;
  shareUrl: string;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-[26rem] p-5 relative shadow-lg">
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <IoClose size={24} />
        </button>

        {/* 공유 아이콘 */}
        <div className="flex justify-around items-center mt-2">
          <div className="flex flex-col items-center text-xs">
            <SiKakaotalk size={30} className="text-yellow-400" />
            <span>카카오톡</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <FaFacebook size={30} className="text-blue-600" />
            <span>Facebook</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <FaWhatsapp size={30} className="text-green-500" />
            <span>WhatsApp</span>
          </div>
          <div className="flex flex-col items-center text-xs">
            <FaXTwitter size={30} />
            <span>X</span>
          </div>
        </div>

        {/* 링크 복사 */}
        <div className="mt-5 flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
          <input
            readOnly
            value={shareUrl}
            className="flex-1 text-sm bg-transparent outline-none"
          />
          <button
            className="bg-blue-500 text-white text-sm px-4 py-1 rounded-full"
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("링크가 복사되었습니다.");
            }}
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
}
