"use client";
import React from "react";

interface RoundedBtnWithIconProps {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}

const RoundedBtnWithIcon: React.FC<RoundedBtnWithIconProps> = ({
  icon,
  text,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-lightRedBtn w- sm:w-[100px] md:min-w-[130px] md:h-10 rounded-[40px] py-2 px-2 md:px-4
    flex md:gap-3 items-center justify-between"
    >
      <span className="text-[10px] sm:text-xs md:font-bold text-main">
        {text}
      </span>
      {icon}
    </button>
  );
};

export default RoundedBtnWithIcon;
