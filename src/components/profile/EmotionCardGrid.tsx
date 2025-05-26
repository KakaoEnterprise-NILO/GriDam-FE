import peacefulImg from "@/assets/picture/peaceful.png";
import lonelyImg from "@/assets/picture/lonely.png";
import EmotionCard from "./EmotionCard";

const cards = [
  { src: peacefulImg, label: "PEACEFUL", mood: "Happy" },
  { src: lonelyImg, label: "쓸쓸함", mood: "" },
  { src: peacefulImg, label: "PEACEFUL", mood: "Happy" },
  { src: peacefulImg, label: "PEACEFUL", mood: "Happy" },
  { src: lonelyImg, label: "쓸쓸함", mood: "" },
  { src: peacefulImg, label: "PEACEFUL", mood: "Happy" },
  { src: peacefulImg, label: "PEACEFUL", mood: "Happy" },
  { src: lonelyImg, label: "쓸쓸함", mood: "" },
  { src: peacefulImg, label: "PEACEFUL", mood: "Happy" },
];

export default function EmotionCardGrid() {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl max-w-[40rem] mx-auto">
      <h3 className="font-semibold text-sm text-gray-800 mb-6 flex items-center gap-2">
        <span className="text-lg">📌</span> Highlight
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card, index) => (
          <EmotionCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}
