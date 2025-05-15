import { useRef, useState } from "react";
import addPictureIcon from '../../assets/picture/add_picture_icon.svg';

export default function WritingDiary() {
  const currentDate = new Date().toISOString().split('T')[0];
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [imageHeight, setImageHeight] = useState(0); // 이미지 높이 상태 관리

  // 이미지 추가 시 높이 증가 비율 (0.1 = 10%)
  const heightIncreaseRatio = 0.1;

  // 이미지 선택 시 처리 함수
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);

        // 이미지 크기 계산
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

  // 버튼 클릭 시 파일 첨부창 열기
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="bg-white w-[600px] p-8 rounded-2xl shadow-lg flex flex-col justify-between space-y-4"
      style={{
        minHeight: `700px`,
        height: `calc(700px + ${imageHeight}px)`,
      }}
    >
      {/* 제목 */}
      <div>
        <input
          type="text"
          className="w-full p-2 bg-transparent text-lg font-semibold focus:outline-none placeholder:text-gray-400"
          placeholder="제목"
        />
        <hr className="border-t border-gray-200 mt-2" />
      </div>

      {/* 작성일자 */}
      <div className="flex justify-between text-gray-500">
        <span>작성날짜</span>
        <span>{currentDate}</span>
      </div>
      <hr className="border-t border-gray-200" />

      {/* 내용 작성 */}
      <div className="relative flex-1">
        <textarea
          className="w-full h-full p-2 bg-transparent focus:outline-none placeholder:text-gray-400 resize-none"
          placeholder="오늘은 무슨 일이 있었나요?"
        />

        {/* 이미지 추가 버튼 */}
        <button 
          className="absolute bottom-2 left-2 p-2 rounded-lg text-gray-600 hover:bg-gray-300"
          onClick={handleImageClick}
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
            style={{ maxHeight: `300px` }} // 이미지 최대 높이 제한
          />
        </div>
      )}

      {/* 작성 완료 버튼 */}
      <div className="mt-auto">
        <button className="bg-blue-500 text-white w-full py-3 text-lg rounded-lg hover:bg-blue-600">
          작성 완료
        </button>
      </div>
    </div>
  );
}
