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
      className="hidden custom-rounded8 custom-font12 bg-main w-[9vw] min-w-[90px] py-2 px-2 md:py-[1.77vh] 
      h-[38px] md:h-[44px] xxl:h-[47px] hd:h-[4.5vh]
      text-light font-medium custom:font-bold 
      border hd:border-[0.06vw] border-white md:flex items-center justify-center
       hover:bg-white hover:border-main hover:text-main
      transition-all duration-300 ease-in-out"
    >
      {text}
    </button>
  );
};

export default HeaderButton;
