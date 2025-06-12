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
      className="bg-lightRedBtn w-auto lg:min-w-[130px] h-6 lg:h-10 rounded-[40px] p-2 md:p-4
    flex gap-2 md:gap-3 items-center justify-between"
    >
      <span className="text-[10px] sm:text-xs md:font-bold text-main">
        {text}
      </span>
      {icon}
    </button>
  );
};

export default RoundedBtnWithIcon;
