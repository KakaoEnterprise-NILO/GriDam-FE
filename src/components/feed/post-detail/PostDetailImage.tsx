import { DETAIL_CARD_IMAGE_URL } from "./constants";

export default function PostDetailImage() {
  return (
    <div className="flex-1 bg-gray-50 flex justify-center items-center p-6">
      <img
        src={DETAIL_CARD_IMAGE_URL}
        alt="감정카드"
        className="w-full rounded-xl"
      />
    </div>
  );
}
