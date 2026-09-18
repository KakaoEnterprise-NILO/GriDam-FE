export default function DiaryCardFooter({
  hashtags,
  color,
  buttonText,
  disabled,
  onFetch,
}: {
  hashtags: string[];
  color: string;
  buttonText: string;
  disabled: boolean;
  onFetch: () => void;
}) {
  return (
    <div
      className="flex justify-between items-center text-white px-4 py-2 transition-colors duration-300"
      style={{ backgroundColor: color }}
    >
      {hashtags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span key={tag} className="text-sm font-semibold">
              #{tag.replace(/^#/, "")}
            </span>
          ))}
        </div>
      )}
      <button
        className={`flex-shrink-0 ml-auto mr-[5%] text-sm font-semibold transition-all duration-200 ${disabled ? "opacity-50 cursor-not-allowed" : "hover:underline hover:scale-105"}`}
        onClick={onFetch}
        disabled={disabled}
      >
        {buttonText}
      </button>
    </div>
  );
}
