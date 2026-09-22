import EmotionCard from "../EmotionCard";
import { getCardEmotionProps } from "./utils";
import type { EmotionCardDataType } from "./types";
export default function DiaryEmotionCardModal({
  data,
  date,
  onClose,
}: {
  data: EmotionCardDataType;
  date: string;
  onClose: () => void;
}) {
  const props = getCardEmotionProps(data, date);
  return (
    <EmotionCard front={props.front} back={props.back} onClose={onClose} />
  );
}
