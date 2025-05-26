interface NotificationCardProps {
  imageSrc: string;
  title: string;
  message: string;
  time: string;
  onClick?: () => void;
}

export default function NotificationCard({
  imageSrc,
  title,
  message,
  time,
  onClick,
}: NotificationCardProps) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex items-start justify-between gap-3 px-4 py-3 rounded-md hover:bg-gray-50 transition"
    >
      <img
        src={imageSrc}
        alt="card"
        className="w-10 h-10 rounded-md object-cover"
      />
      <div className="flex flex-col flex-grow text-sm">
        <span className="text-gray-800 font-medium">{title}</span>
        <span className="text-gray-500">{message}</span>
      </div>
      <span className="text-xs text-gray-400 whitespace-nowrap">{time}</span>
    </div>
  );
}
