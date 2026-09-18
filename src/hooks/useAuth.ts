import { signUp } from "@/api/auth"
import { useAuthStore } from "@/store/authStore"

export const useAuth = () => {
  const signUpUser = async (data: {
    loginId: string
    password: string
    checkPassword: string
    nickname: string
    phoneNum: string
    auth: boolean
  }) => {
    const response = await signUp(data)
    return response.data
  }

  const loginUser = useAuthStore((state) => state.login)
  const logoutUser = useAuthStore((state) => state.logout)

  return { signUpUser, loginUser, logoutUser }
}
