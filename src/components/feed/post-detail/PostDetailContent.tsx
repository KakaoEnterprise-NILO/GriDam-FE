import { FaUserCircle } from "react-icons/fa";
import { DETAIL_AUTHOR_NAME } from "./constants";

export default function PostDetailContent({ content }: { content?: string }) {
  return (
    <div className="flex items-start gap-3 mb-6">
      <FaUserCircle size={40} className="text-gray-500 mt-1" />
      <div className="flex flex-col text-[18px]">
        <span className="font-semibold text-gray-800">{DETAIL_AUTHOR_NAME}</span>
        <span className="text-gray-700 leading-snug whitespace-pre-wrap">
          {content ?? "로딩 중..."}
        </span>
      </div>
    </div>
  );
}
