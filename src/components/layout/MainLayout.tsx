"use client";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <Header />
      <main className="flex flex-col w-full flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
