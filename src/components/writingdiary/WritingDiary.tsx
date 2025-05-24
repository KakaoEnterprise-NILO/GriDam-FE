import { useRef, useState } from "react";
import axios from "axios";
import addPictureIcon from '../../assets/picture/add_picture_icon.svg';

export default function WritingDiary({ onComplete }: { onComplete: () => void }) {
  const currentDate = new Date().toISOString().split('T')[0];
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageHeight, setImageHeight] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const heightIncreaseRatio = 0.1;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);

        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const adjustedHeight = img.height * heightIncreaseRatio;
          setImageHeight(adjustedHeight);
        };
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    if (!isCompleted) {
      fileInputRef.current.click();
    }
  };

  const handleSubmitToAPI = async () => {
    try {
      const formData = new FormData();
      const dto = {
        title,
        content,
      };

      formData.append("request", new Blob([JSON.stringify(dto)], { type: "application/json" }));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      // ✅ 로그 출력
      for (const pair of formData.entries()) {
        if (pair[1] instanceof Blob) {
          const reader = new FileReader();
          reader.onload = () => {
            console.log(`[FormData] ${pair[0]} =`, reader.result);
          };
          reader.readAsText(pair[1]);
        } else {
          console.log(`[FormData] ${pair[0]} =`, pair[1]);
        }
      }

      const response = await axios.post("/api/diaries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log("🟢 작성 성공:", response.data);
    } catch (error) {
      console.error("🔴 작성 실패:", error);
    }
  };

  const handleCompleteClick = async (e) => {
    e.stopPropagation();
    setIsCompleted(true);
    await handleSubmitToAPI();
    onComplete();
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
      {/* 제목 */}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

      {/* 내용 입력 영역 */}
      <div className="relative flex-1 min-h-[300px]">
        <textarea
          className="w-full h-full p-2 bg-transparent placeholder-gray-400 resize-none"
          placeholder="오늘은 무슨 일이 있었나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={isCompleted}
        />
        <button
          className={`absolute bottom-2 left-2 p-2 rounded-lg text-gray-600 hover:bg-gray-300 ${
            isCompleted ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleImageClick}
          disabled={isCompleted}
        >
          <img src={addPictureIcon} alt="사진 추가" className="w-6 h-6" />
        </button>
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
          onClick={handleCompleteClick}
          disabled={isCompleted}
        >
          작성 완료
        </button>
      </div>
    </div>
  );
}
