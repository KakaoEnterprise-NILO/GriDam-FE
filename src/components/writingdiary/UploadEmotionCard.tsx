import { useState, useRef } from "react";
import "./UploadEmotionCard.css";
import refreshIcon from "../../assets/icons/refresh_button_icon.svg";
import downloadIcon from "../../assets/icons/download_button_icon.svg";

export default function UploadEmotionCard() {
  const [feedVisibility, setFeedVisibility] = useState("공개");
  const [shareScope, setShareScope] = useState("공개");
  const [progress, setProgress] = useState(80);

  const progressBarRef = useRef<HTMLDivElement | null>(null);

  // 진행도 바 클릭 또는 드래그 시 값 업데이트
  const updateProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressBarRef.current) return;

    const rect = progressBarRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const newProgress = Math.round((offsetX / rect.width) * 100);
    setProgress(Math.min(100, Math.max(0, newProgress)));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-4/5 max-w-md p-6 rounded-2xl shadow-lg space-y-6 relative">

        {/* 재생성 및 다운로드 버튼 */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="icon-button" onClick={() => console.log("재생성 클릭됨")}>
            <img src={refreshIcon} alt="재생성" className="w-6 h-6" />
          </button>
          <button className="icon-button" onClick={() => console.log("다운로드 클릭됨")}>
            <img src={downloadIcon} alt="다운로드" className="w-6 h-6" />
          </button>
        </div>

        {/* 감정 카드 */}
        <div className="flex justify-center">
          <div className="w-64 h-80 bg-gray-200 rounded-lg flex flex-col items-center justify-center p-4 space-y-2">
            <h2 className="text-xl font-bold text-gray-700">PEACEFUL</h2>
            <div className="w-16 h-16 bg-yellow-300 rounded-full"></div>
            <p className="text-lg text-gray-600 font-serif">Happy</p>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-t border-gray-300 my-4" />

        {/* 피드 생성 여부 */}
        <div>
          <p className="text-gray-600 mb-2 text-left">피드 생성 여부</p>
          <div className="flex justify-center space-x-6">
            <label className="custom-radio">
              <input
                type="radio"
                name="feedVisibility"
                value="공개"
                checked={feedVisibility === "공개"}
                onChange={() => setFeedVisibility("공개")}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">공개</span>
            </label>

            <label className="custom-radio">
              <input
                type="radio"
                name="feedVisibility"
                value="비공개"
                checked={feedVisibility === "비공개"}
                onChange={() => setFeedVisibility("비공개")}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">비공개</span>
            </label>
          </div>
        </div>

        {/* 공개 범위 */}
        <div>
          <p className="text-gray-600 mb-2 text-left">공개 범위</p>
          <div className="flex justify-center space-x-6">
            <label className="custom-radio">
              <input
                type="radio"
                name="shareScope"
                value="공개"
                checked={shareScope === "공개"}
                onChange={() => setShareScope("공개")}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">공개</span>
            </label>

            <label className="custom-radio">
              <input
                type="radio"
                name="shareScope"
                value="요약 공개"
                checked={shareScope === "요약 공개"}
                onChange={() => setShareScope("요약 공개")}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">요약 공개</span>
            </label>

            <label className="custom-radio">
              <input
                type="radio"
                name="shareScope"
                value="비공개"
                checked={shareScope === "비공개"}
                onChange={() => setShareScope("비공개")}
              />
              <span className="custom-radio-btn"></span>
              <span className="text-gray-800 font-bold">비공개</span>
            </label>
          </div>
        </div>

        {/* 요약본 및 진행도 바 - 요약 공개일 때만 보임 */}
        {shareScope === "요약 공개" && (
          <div>
            <p className="text-gray-600 mb-2 text-left">요약본</p>
            <p className="text-gray-700 text-sm mb-4">
              오늘은 잔잔한 햇살 아래 조용한 시간을 보냈다.
            </p>

            {/* 진행도 바 */}
            <div className="mt-2">
              <div className="flex items-center">
                <span className="font-bold text-blue-500">T</span>

                <div
                  className="flex-1 mx-2 bg-gray-200 rounded-full h-3 relative cursor-pointer"
                  ref={progressBarRef}
                  onMouseDown={updateProgress}
                  onMouseMove={(e) => e.buttons === 1 && updateProgress(e)}
                >
                  <div
                    className="h-3 rounded-full absolute left-0"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(to right, #4f83ff, #4caf50)`,
                    }}
                  ></div>
                </div>

                <span className="font-bold text-gray-700">F</span>
              </div>

              {/* 퍼센트 표시 */}
              <p className="text-center text-sm text-gray-600 mt-1">{progress}%</p>
            </div>
          </div>
        )}

        {/* 완료 버튼 */}
        <div className="flex justify-center mt-4">
          <button className="bg-blue-500 text-white py-2 px-8 rounded-lg hover:bg-blue-600">
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
