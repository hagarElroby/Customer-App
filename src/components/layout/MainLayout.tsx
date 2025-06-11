"use client";
import Header from "./Header";
import Footer from "./Footer";
import GoToTheAppSection from "../home/GoToTheAppSection";
import FixedFooter from "./FixedFooter";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <GoToTheAppSection />
      <Header />
      <main className="flex flex-col w-full flex-grow">{children}</main>
      <Footer />
      <FixedFooter />
    </div>
  );
};

export default MainLayout;
