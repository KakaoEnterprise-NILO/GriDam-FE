import { MoreVertical, Trash2 } from "lucide-react";
import type { MutableRefObject } from "react";
export default function DiaryCardMenu({
  menuRef,
  showMenu,
  onToggle,
  onDelete,
}: {
  menuRef: MutableRefObject<HTMLDivElement | null>;
  showMenu: boolean;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="absolute top-2 right-2" ref={menuRef}>
      <MoreVertical
        size={20}
        className="text-gray-400 cursor-pointer hover:text-gray-600"
        onClick={onToggle}
      />
      {showMenu && (
        <div className="absolute right-0 mt-2 w-24 bg-white border rounded shadow z-10">
          <button
            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 w-full text-red-600"
            onClick={onDelete}
          >
            <Trash2 size={16} />
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
