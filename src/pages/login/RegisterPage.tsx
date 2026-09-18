import GrayFooter from "@/components/common/GrayFooter";
import RegisterHeader from "@/components/login/RegisterHeader";
import RegisterForm from "@/components/login/RegisterForm";
import { useRegisterPage } from "@/components/login/useRegisterPage";
export default function RegisterPage() {
  const state = useRegisterPage();
  return (
    <div className="min-w-screen min-h-screen flex flex-col justify-between items-center bg-[#F0F3FA]">
      <div className="w-full h-56 bg-[#A8BFFF] rounded-b-2xl"></div>
      <div className="bg-white w-96 p-6 rounded-2xl shadow-lg -mt-28 z-10">
        <RegisterHeader />
        <RegisterForm
          formData={state.formData}
          errorMsg={state.errorMsg}
          isLoading={state.isLoading}
          isAuthSent={state.isAuthSent}
          message={state.message}
          onChange={state.handleChange}
          sendCode={state.sendCode}
          verifyCode={state.verifyCode}
          onSubmit={state.handleSignUp}
        />
      </div>
      <GrayFooter />
    </div>
  );
}
