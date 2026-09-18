import { useState } from "react";
import { useDiaryForm } from "../../hooks/useDiaryForm";
import { useImageUpload } from "../../hooks/useImageUpload";
import addPictureIcon from "../../assets/picture/add_picture_icon.svg";

interface WritingDiaryProps {
  onComplete: (
    diaryId: string,
    data: { title: string; content: string; imageFile?: File | null }
  ) => void;
}

export default function WritingDiary({ onComplete }: WritingDiaryProps) {
  const currentDate = new Date().toISOString().split("T")[0];

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const {
    fileInputRef,
    selectedFile,
    previewImage,
    error: imageError,
    accept,
    handleImageChange,
    handleImageClick,
  } = useImageUpload();

  const { isSubmitting, error, handleCompleteClick } = useDiaryForm(onComplete);

  const onSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    await handleCompleteClick(selectedFile, title, content);
  };

  return (
    <div
      className="bg-white w-[700px] p-8 rounded-2xl shadow-lg flex flex-col space-y-4 transition-all duration-500"
      style={{
        minHeight: `700px`,
      }}
    >
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 bg-transparent text-lg font-semibold placeholder-gray-400"
          placeholder="제목"
          disabled={isSubmitting}
        />
        <hr className="border-t border-gray-200 mt-2" />
      </div>

      <div className="flex justify-between text-gray-500">
        <span>작성날짜</span>
        <span>{currentDate}</span>
      </div>
      <hr className="border-t border-gray-200" />

      <div className="relative flex-1">
        <textarea
          className="w-full h-full p-2 bg-transparent placeholder-gray-400 resize-none"
          placeholder="오늘은 무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isSubmitting}
        />

        <button
          className={`absolute bottom-2 left-2 p-2 rounded-lg text-gray-600 hover:bg-gray-300 ${
            isSubmitting ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleImageClick}
          disabled={isSubmitting}
        >
          <img src={addPictureIcon} alt="사진 추가" className="w-6 h-6" />
        </button>

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          className="hidden"
          accept={accept}
          disabled={isSubmitting}
        />
      </div>

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

      {(imageError || error) && (
        <p role="alert" className="text-sm text-red-600">
          {imageError || error}
        </p>
      )}

      <div className="mt-auto">
        <button
          className={`w-full py-3 text-lg rounded-lg ${
            isSubmitting ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
          onClick={onSubmit}
          disabled={isSubmitting}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}
