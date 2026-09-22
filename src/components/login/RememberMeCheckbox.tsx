export default function RememberMeCheckbox({
  isRemembered,
  onToggle,
}: {
  isRemembered: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="flex items-center mb-3 px-3 cursor-pointer select-none"
      onClick={onToggle}
      role="checkbox"
      aria-checked={isRemembered}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <div
        className={`w-10 h-5 rounded-full flex items-center p-1 transition-colors duration-300 ${isRemembered ? "bg-blue-500" : "bg-gray-300"}`}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isRemembered ? "translate-x-5" : "translate-x-0"}`}
        ></div>
      </div>
      <span className="ml-3 text-sm text-[15px] text-gray-600">
        로그인 상태 유지
      </span>
    </div>
  );
}
