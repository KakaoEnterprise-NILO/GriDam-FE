import { useEffect, useState } from "react";
import "./StatusCard.css";
import { ClipLoader } from "react-spinners";
import checkIcon from "../../assets/icons/check_circle_icon.svg";

export default function StatusCard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3초 후에 체크 표시로 전환

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-72 h-96 rounded-lg shadow-lg flex flex-col justify-center items-center space-y-4">
        {isLoading ? (
          <>
            <ClipLoader color="#4f83ff" size={160} />
            <p className="text-gray-700">업로드 중...</p>
          </>
        ) : (
          <>
            <img src={checkIcon} alt="완료" className="w-45 h-45" />
            <p className="text-gray-700">감정카드가 게시되었습니다.</p>
          </>
        )}
      </div>
    </div>
  );
}
