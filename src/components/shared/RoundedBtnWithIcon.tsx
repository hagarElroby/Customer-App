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
      className="bg-lightRedBtn min-width-[100px] h-10 rounded-[40px] py-2 px-4
    flex gap-3 items-center"
    >
      <span className="text-xs font-bold text-main">{text}</span>
      {icon}
    </button>
  );
};

export default RoundedBtnWithIcon;
