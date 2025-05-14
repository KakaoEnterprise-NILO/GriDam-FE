import { useRef, useState } from "react";
import addPictureIcon from '../../assets/picture/add_picture_icon.svg';

export default function WritingDiary() {
  const currentDate = new Date().toISOString().split('T')[0];
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null);

  // 이미지 선택 시 처리 함수
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // 버튼 클릭 시 파일 첨부창 열기
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* 일기 작성 카드 */}
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white w-4/5 max-w-lg p-6 rounded-2xl shadow-lg space-y-4">

          {/* 제목 */}
          <div className="pb-2">
            <input
              type="text"
              className="w-full p-2 bg-transparent focus:outline-none placeholder:text-gray-400"
              placeholder="제목"
            />
            <hr className="border-t border-gray-200 mt-2" />
          </div>

          {/* 작성일자 */}
          <div className="flex items-center justify-between text-gray-500 pb-2">
            <span>작성날짜</span>
            <span>{currentDate}</span>
          </div>
          <hr className="border-t border-gray-200" />

          {/* 내용 작성 */}
          <div className="relative mt-2">
            <textarea
              className="w-full h-48 p-2 bg-transparent focus:outline-none placeholder:text-gray-400 resize-none"
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

          <hr className="border-t border-gray-200 mt-2" />

          {/* 이미지 미리보기 */}
          {previewImage && (
            <div className="mt-4 flex justify-center">
              <img src={previewImage} alt="첨부 이미지" className="w-full max-w-md rounded-lg" />
            </div>
          )}

          {/* 작성 완료 버튼 */}
          <div className="flex justify-center mt-4">
            <button className="bg-blue-500 text-white w-full py-3 rounded-lg hover:bg-blue-600">
              작성 완료
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
