import logoUrl from "@/assets/picture/gridam.svg";
interface Props {
  isLoggedIn: boolean;
  onWrite: () => void;
  onLogin: () => void;
  onRegister: () => void;
}
export default function HomeHero({
  isLoggedIn,
  onWrite,
  onLogin,
  onRegister,
}: Props) {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 -z-10"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="flex flex-col items-center text-center py-16 px-4">
        <div className="relative mb-8 group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
          <img
            src={logoUrl || "/placeholder.svg"}
            alt="그리담 로고"
            className="relative w-72 h-60 object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            감정 일기장
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            당신의 감정을 기록하고, 분석하고, 공유하는 특별한 공간
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          {isLoggedIn ? (
            <button
              onClick={onWrite}
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span className="relative z-10">✨ 일기 작성하기</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <>
              <button
                onClick={onLogin}
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="relative z-10">로그인</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button
                onClick={onRegister}
                className="group relative px-8 py-4 bg-white text-blue-600 font-semibold border-2 border-blue-500 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:bg-blue-50"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
