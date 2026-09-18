import Footer from "@/components/common/Footer";
import LoginLogo from "@/components/login/LoginLogo";
import LoginForm from "@/components/login/LoginForm";
import { useLoginPage } from "@/components/login/useLoginPage";
export default function LoginPage() {
  const state = useLoginPage();
  if (!state) return null;
  return (
    <div className="min-h-screen min-w-screen flex flex-col justify-between items-center p-1 bg-[#F0F3FA]">
      <main className="flex flex-col items-center flex-1 scale-90 mt-0">
        <LoginLogo />
        <LoginForm
          loginId={state.loginId}
          password={state.password}
          isRemembered={state.isRemembered}
          errorMsg={state.errorMsg}
          onLogin={state.handleLogin}
          onRegister={() => state.navigate("/register")}
          onSocialLogin={state.handleSocialLogin}
          onLoginIdChange={state.setLoginId}
          onPasswordChange={state.setPassword}
          onRememberToggle={() =>
            state.setIsRemembered((previous) => !previous)
          }
        />
      </main>
      <Footer />
    </div>
  );
}
