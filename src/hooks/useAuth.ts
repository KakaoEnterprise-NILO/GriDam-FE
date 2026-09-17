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


    const response = await signUp(data);
    return response.data;
  };

  const loginUser = async (data: Parameters<typeof login>[0]) => {
    const response = await login(data);


    const { accessToken, refreshToken } = response.data.result;


    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

    return response.data;
  };



  const logoutUser = async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token || token === "null") {
        return;
      }

      const response = await logout(token);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return response.data;

    } catch (error) {
      console.error("logoutUser 에러:", error);
      throw error; // 호출한 쪽에서 처리할 수 있도록 예외 전달
    }
  };

  return { signUpUser, loginUser, logoutUser };
};
