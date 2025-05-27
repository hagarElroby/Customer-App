"use client";

import { useRouter, usePathname } from "next/navigation";
import ResponsiveLogo from "@/components/shared/ResponsiveLogo";
import HeaderButton from "@/components/auth/HeaderButton";
import Footer from "@/components/auth/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isSignUpRoute = ["/auth/signup/"].includes(pathname);
  const isLoginRoute = ["/auth/login/", "/auth/forgot-password/"].includes(
    pathname,
  );
  const buttonText = isSignUpRoute
    ? "LOGIN"
    : isLoginRoute
      ? "SIGN UP"
      : "LOGIN";
  const handleButtonClick = () => {
    if (isSignUpRoute) {
      router.push("/auth/signup/");
    } else if (isLoginRoute) {
      router.push("/auth/login/");
    }
  };

  return (
    <div className="w-full padding-auth-layout flex flex-col min-h-screen layout-container layout-background relative">
      <header className="flex items-center justify-center md:justify-between">
        <ResponsiveLogo onClick={() => router.push("/")} mode="DARK" />
        <HeaderButton text={buttonText} onClick={handleButtonClick} />
      </header>
      <main className="flex items-center justify-center flex-grow mb-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
