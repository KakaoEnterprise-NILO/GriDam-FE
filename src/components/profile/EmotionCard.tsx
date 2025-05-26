interface EmotionCardProps {
  src: string;
  label: string;
  mood: string;
}

export default function EmotionCard({ src }: EmotionCardProps) {
  return (
    <div className="flex justify-center items-center">
      <img
        src={src}
        alt="Emotion card"
        className="w-[160px] h-[200px] rounded-md shadow-md object-cover"
      />
    </div>
  );
}
