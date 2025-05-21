import { useState, useEffect } from 'react';
import MainLayout from '../../components/common/MainLayout';
import { useNavigate } from 'react-router-dom';


export default function Home() {
  const navigate = useNavigate();

  // 여기서는 localStorage에서 로그인 토큰 확인해서 로그인 상태 관리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };

    checkToken();
    window.addEventListener('storage', checkToken);

    return () => window.removeEventListener('storage', checkToken);
  }, []);

  return (
    <MainLayout>
      {/* 상단 제목 및 버튼 */}
      <div className="flex flex-col items-center text-center p-0 mb-10">
        <img src="/logo.png" alt="그리담 로고" className="w-30 h-30 mb-2" />
        <div className="text-3xl font-bold mb-2">“감정 일기장”</div>

        {/* 로그인 여부에 따른 버튼 */}
        <div className="flex space-x-4 mt-2">
          {isLoggedIn ? (
            <button
              onClick={() => navigate('/diary/write')}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow"
            >
              일기 작성하기
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 shadow"
              >
                로그인
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-white text-blue-500 border border-blue-500 px-6 py-2 rounded-lg hover:bg-blue-100 shadow"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>

      {/* 안내 카드 영역 */}
      <div className="bg-blue-100 rounded-xl p-6">
        <h2 className="text-lg font-semibold text-center mb-6">그리담 일기장, 이렇게 활용하세요</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white h-70 p-6 rounded-xl shadow text-center">
            <div className="text-9xl mb-4">📝</div>
            <h3 className="text-md font-bold mb-2">감정을 기록하고 싶은 분</h3>
            <p className="text-sm text-gray-600">
              그리담 일기장은 일기를 쓰고 감정을 분석해 줍니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-9xl mb-4">😊</div>
            <h3 className="text-md font-bold mb-2">일기를 공유하고 싶은 분</h3>
            <p className="text-sm text-gray-600">
              일기를 쓰고 감정카드도 만들어 사람들과 소통할 수 있습니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow text-center">
            <div className="text-9xl mb-4">📘</div>
            <h3 className="text-md font-bold mb-2">감정을 관리하고 싶은 분</h3>
            <p className="text-sm text-gray-600">
              캘린더를 통해 보기 쉽게 감정 추이를 볼 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
