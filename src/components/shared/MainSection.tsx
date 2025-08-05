import React, { ReactNode } from "react";

interface MainSectionProps {
  children: ReactNode;
}

const MainSection: React.FC<MainSectionProps> = ({ children }) => {
  return (
    <main className="flex w-full flex-grow flex-col gap-10 bg-homeBg pb-28">
      {children}
    </main>
  );
};

export default MainSection;
