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
  console.log(pathname);
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
    console.log(isSignUpRoute);
    if (isSignUpRoute) {
      router.push("/auth/login/");
    } else if (isLoginRoute) {
      router.push("/auth/signup/");
    }
  };

  return (
    <div className="w-full px-4 md:px-[30px] pt-4 pb-3 flex flex-col h-[100vh] layout-container layout-background relative max-w-[1620px] mx-auto overflow-y-auto">
      <header className="flex items-center justify-center md:justify-between mb-3">
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
