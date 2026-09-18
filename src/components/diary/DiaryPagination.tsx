import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationControlsProps {
  page: number;
  maxPage: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function PaginationControls({
  page,
  maxPage,
  onPrev,
  onNext,
}: PaginationControlsProps) {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={onPrev}
        disabled={page === 1}
        className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="이전 페이지"
      >
        <ChevronLeft size={24} />
      </button>

      <span className="font-medium">
        {page} / {maxPage}
      </span>

      <button
        onClick={onNext}
        disabled={page === maxPage}
        className="p-2 rounded-md hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed"
        aria-label="다음 페이지"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
