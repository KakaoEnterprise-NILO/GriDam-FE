// ✅ src/hooks/useAuth.ts
import { signUp, login, logout } from "@/api/auth";

export const useAuth = () => {
  
  const signUpUser = async (data: {
    loginId: string;
    password: string;
    checkPassword: string;
    nickname: string;
    phoneNum: string;
    auth: boolean;
  }) => {

    //현재 전화번호 인증 API사용 못하므로 일단 주석처리
    // if (!data.auth) {
    //   throw new Error("전화번호 인증이 완료되지 않았습니다.");
    // }

    const response = await signUp(data);
    return response.data;
  };

  const loginUser = async (data: any) => {
    const response = await login(data);

    // ✅ 응답 구조 로깅
    console.log("✅ 로그인 응답 데이터:", response.data);

    const { accessToken, refreshToken } = response.data.result;

    // ✅ 토큰 로깅
    console.log("✅ accessToken:", accessToken);
    console.log("✅ refreshToken:", refreshToken);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  };



  const logoutUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      console.log("logoutUser 진입 - accessToken:", token);

      if (!token || token === "null") {
        console.warn("No access token found, skipping logout API call.");
        return;
      }

      const response = await logout(token);

      // ✅ 토큰 제거
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      console.log("로그아웃 완료");
      return response.data;

    } catch (error) {
      console.error("logoutUser 에러:", error);
      throw error; // 호출한 쪽에서 처리할 수 있도록 예외 전달
    }
  };

  return { signUpUser, loginUser, logoutUser };
};
