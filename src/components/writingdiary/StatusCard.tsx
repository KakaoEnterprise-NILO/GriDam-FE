import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import checkIcon from "../../assets/icons/check_circle_icon.svg";
import { IoClose } from "react-icons/io5";

interface StatusCardProps {
  onComplete: () => void;
}

export default function StatusCard({ onComplete }: StatusCardProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center w-full max-w-[25rem] min-h-[30rem] bg-gray-100">
      <div className="relative bg-white w-full max-w-[25rem] min-h-[30rem] p-4 sm:p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center space-y-4">
        <button type="button"
          onClick={onComplete}
          className="absolute top-3 right-3 z-10 text-gray-400 hover:text-black transition"
        >
          <IoClose size={24} />
        </button>

        {isLoading ? (
          <>
            <ClipLoader color="#4f83ff" size={160} />
            <p className="text-gray-700">업로드 중...</p>
          </>
        ) : (
          <>
            <img src={checkIcon} alt="완료" className="w-20 h-20" />
            <p className="text-gray-700">감정카드가 게시되었습니다.</p>
          </>
        )}
      </div>
    </div>
  );
}
