import React from "react";
import TopSectionFooter from "./TopSectionFooter";
import MiddleSectionFooter from "./MiddleSectionFooter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-homeBg pb-20 md:pb-0">
      <div className="mx-auto">
        {/* Top Section */}
        <TopSectionFooter />
        {/* Middle Section */}
        <div className="w-[90vw] h-[2px] bg-bgBullets mx-auto"></div>
        <MiddleSectionFooter />

        {/* Copyright Section */}
        <div className="text-center text-xs md:text-sm lg:text-base font-normal text-[#212121] bg-white p-4">
          <p>&copy; Copyright Dizzly {currentYear}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
