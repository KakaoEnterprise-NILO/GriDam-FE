import { IoClose } from "react-icons/io5";

export default function PostDetailActions({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute top-4 right-4 z-10 text-gray-400 hover:text-black transition"
    >
      <IoClose size={24} />
    </button>
  );
}
