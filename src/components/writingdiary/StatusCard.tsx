import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import checkIcon from "../../assets/icons/check_circle_icon.svg";

export default function StatusCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center w-[25rem] h-[30rem] bg-gray-100">
      <div className="bg-white w-[25rem] h-[30rem] p-6 rounded-2xl shadow-lg flex flex-col justify-center items-center space-y-4">
        {isLoading ? (
          <>
            <ClipLoader color="#4f83ff" size={160} />
            <p className="text-gray-700">업로드 중...</p>
          </>
        ) : (
          <>
            <img src={checkIcon} alt="완료" className="w-50 h-50" />
            <p className="text-gray-700">감정카드가 게시되었습니다.</p>
          </>
        )}
      </div>
    </div>
  );
}
