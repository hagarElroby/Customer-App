import { svgs } from "../icons/svgs";
import { useState } from "react";

interface AddToCartBtnProps {
  onClick: () => void;
  disabled?: boolean;
}

const AddToCartBtn: React.FC<AddToCartBtnProps> = ({ onClick, disabled }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="submit"
      className="w-full h-12 uppercase flex items-center justify-center gap-2 bg-main text-white text-sm font-semibold rounded-[64px]
            hover:bg-white hover:text-main hover:border hover:border-main transition-all duration-300 ease-in-out"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Add to cart {isHovered ? svgs.redCard : svgs.card}
    </button>
  );
};

export default AddToCartBtn;
