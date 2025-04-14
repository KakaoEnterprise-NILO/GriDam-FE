// 로그인 타입
export type ButtonType = "kakao" | "google" | "gridam";

export const styles = {
  container: "min-h-screen flex flex-col justify-center items-center bg-white px-4",
  logoWrapper: "mb-12 flex flex-col items-center",
  logoImage: "w-70 h-70 mb-2 sm:w-44 sm:h-44 md:w-48 md:h-48",
  logoText: "text-3xl font-bold text-gray-800",

  buttonGroup: "w-full max-w-xs space-y-4",
  iconButtonWrapper: "flex items-center justify-center space-x-2",

  kakaoButton: "w-full py-3 rounded-xl bg-yellow-300 text-black font-semibold shadow",
  googleButton: "w-full py-3 rounded-xl border border-gray-300 text-gray-800 font-semibold shadow",
  googleIcon: "w-5 h-5 object-contain", // ✅ 아이콘 사이즈 제한 + 비율 유지
  gridamButton: "w-full py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold shadow",

  subText: "mt-4 text-sm text-gray-500",
  signupText: "absolute bottom-4 text-sm text-gray-400",
};
