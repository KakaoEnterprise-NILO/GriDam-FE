
// ✅ src/hooks/useAuth.ts
import { signUp, login } from "@/api/auth";

export const useAuth = () => {
  const signUpUser = async (data: any) => {
    const response = await signUp(data);
    return response.data;
  };

  const loginUser = async (data: any) => {
    const response = await login(data);
    return response.data;
  };

  return { signUpUser, loginUser };
};
