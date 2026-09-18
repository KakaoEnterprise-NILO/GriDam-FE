"use client";
import MainLayout from "../../components/common/MainLayout";
import HomeHero from "../../components/home/HomeHero";
import HomeFeatures from "../../components/home/HomeFeatures";
import { useHomePage } from "../../components/home/useHomePage";
export default function HomePage() {
  const { isLoggedIn, isLoading, navigate } = useHomePage();
  if (isLoading)
    return (
      <MainLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </MainLayout>
    );
  return (
    <MainLayout>
      <HomeHero
        isLoggedIn={isLoggedIn}
        onWrite={() => navigate("/diary/write")}
        onLogin={() => navigate("/login")}
        onRegister={() => navigate("/register")}
      />
      <HomeFeatures />
    </MainLayout>
  );
}
