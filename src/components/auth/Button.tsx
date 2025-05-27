"use client";
import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  radius?: string;
  bgColor?: string;
  color?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  children,
  disabled = false,
  className,
  radius,
  bgColor,
  color,
}) => {
  return (
    <button
      style={{ borderRadius: radius, backgroundColor: bgColor, color: color }}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "white";
        e.currentTarget.style.color = "#A21F35";
        e.currentTarget.style.border = "1px solid #A21F35";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = bgColor || "";
        e.currentTarget.style.color = color || "";
        e.currentTarget.style.border = "none";
      }}
      className={`${className} input-height rounded-lg hd:rounded-[0.55vw] input-padding custom-font12
      flex items-center justify-center bg-main border border-main uppercase
      text-white w-full font-semibold md:font-bold 
      hover:bg-white hover:border-[1px] hover:border-main hover:text-main
      transition-all duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
};

export default Button;
