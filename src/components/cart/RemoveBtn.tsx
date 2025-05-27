import React from "react";
interface RemoveBtnProps {
  onClick: () => void;
}
const RemoveBtn: React.FC<RemoveBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-32 h-9 px-8 py-3 border-[2px] border-main uppercase bg-white 
      rounded-[55px] font-semibold text-main text-sm flex items-center justify-center
      hover:bg-main hover:text-white transition-all duration-300"
    >
      Remove
    </button>
  );
};

export default RemoveBtn;
