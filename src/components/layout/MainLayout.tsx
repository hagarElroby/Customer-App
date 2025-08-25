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
    <div className="flex flex-col h-[100vh] w-[100vw]">
      <div className="mx-auto w-full max-w-[1620px]">
        <GoToTheAppSection />
        <Header />
      </div>
      <div className="flex flex-grow flex-col w-full h-full overflow-y-auto  max-w-[1620px] mx-auto">
        <main>{children}</main>
        <Footer />
        <FixedFooter />
      </div>
    </div>
  );
};

export default MainLayout;
