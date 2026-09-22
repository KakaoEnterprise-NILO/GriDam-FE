import { DETAIL_CARD_IMAGE_URL } from "./constants";

export default function PostDetailImage() {
  return (
    <div className="flex max-h-[35vh] min-h-0 w-full flex-1 bg-gray-50 p-3 sm:p-4 md:max-h-none md:w-1/2 md:p-6">
      <img
        src={DETAIL_CARD_IMAGE_URL}
        alt="감정카드"
        className="max-h-full max-w-full object-contain rounded-xl"
      />
    </div>
  );
}
