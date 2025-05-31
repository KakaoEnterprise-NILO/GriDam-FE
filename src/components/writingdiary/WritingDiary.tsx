import { useDiaryForm } from "../../hooks/useDiaryForm";
import { useImageUpload } from "../../hooks/useImageUpload";
import addPictureIcon from "../../assets/picture/add_picture_icon.svg";

export default function WritingDiary({ onComplete }: { onComplete: () => void }) {
  const currentDate = new Date().toISOString().split("T")[0];
  const token = localStorage.getItem("accessToken") || "";

  const {
    fileInputRef,
    selectedFile,
    previewImage,
    imageHeight,
    handleImageChange,
    handleImageClick,
    uploadImage,
  } = useImageUpload(token);

  const { isCompleted, setIsCompleted, handleCompleteClick } = useDiaryForm(onComplete);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const uploadResult = await uploadImage(); // 서버에 이미지 업로드
    await handleCompleteClick(selectedFile, token); // 일기 작성 요청
  };

  const resetCompletion = () => {
    setIsCompleted(false);
  };

  return (
    <div
      className="bg-white w-[700px] p-8 rounded-2xl shadow-lg flex flex-col space-y-4 transition-all duration-500"
      style={{
        minHeight: `700px`,
        height: `calc(700px + ${imageHeight}px)`,
      }}
      onClick={resetCompletion}
    >
      {/* 제목 입력 */}
      <div>
        <input
          type="text"
          className="w-full p-2 bg-transparent text-lg font-semibold placeholder-gray-400"
          placeholder="제목"
          disabled={isCompleted}
        />
        <hr className="border-t border-gray-200 mt-2" />
      </div>

      {/* 작성일자 */}
      <div className="flex justify-between text-gray-500">
        <span>작성날짜</span>
        <span>{currentDate}</span>
      </div>
      <hr className="border-t border-gray-200" />

      {/* 내용 */}
      <div className="relative flex-1">
        <textarea
          className="w-full h-full p-2 bg-transparent placeholder-gray-400 resize-none"
          placeholder="오늘은 무슨 일이 있었나요?"
          disabled={isCompleted}
        />

        {/* 이미지 추가 버튼 */}
        <button
          className={`absolute bottom-2 left-2 p-2 rounded-lg text-gray-600 hover:bg-gray-300 ${
            isCompleted ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleImageClick}
          disabled={isCompleted}
        >
          <img src={addPictureIcon} alt="사진 추가" className="w-6 h-6" />
        </button>

        {/* 파일 입력 */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept="image/*"
        />
      </div>

      {/* 이미지 미리보기 */}
      {previewImage && (
        <div className="mt-4 flex justify-center">
          <img
            src={previewImage}
            alt="첨부 이미지"
            className="w-full max-w-xs rounded-lg"
            style={{ maxHeight: `300px` }}
          />
        </div>
      )}

      {/* 작성 완료 버튼 */}
      <div className="mt-auto">
        <button
          className={`w-full py-3 text-lg rounded-lg ${
            isCompleted ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={onSubmit}
          disabled={isCompleted}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}
