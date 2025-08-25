import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "button" | "submit";
  text: string;
}

const HeaderButton: React.FC<ButtonProps> = ({
  onClick,
  type = "button",
  text,
}) => {
  return (
    <button
      onClick={onClick}
      className="hidden rounded-lg custom-font12 bg-main w-[9vw] min-w-[90px] max-w-36 py-2 px-2 md:py-3 
      h-[38px] md:h-[44px] xxl:h-[47px]
      text-light font-medium custom:font-bold 
      border border-white md:flex items-center justify-center
       hover:bg-white hover:border-main hover:text-main
      transition-all duration-300 ease-in-out"
    >
      {text}
    </button>
  );
};

export default HeaderButton;
