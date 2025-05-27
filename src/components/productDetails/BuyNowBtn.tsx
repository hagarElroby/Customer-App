import React from "react";

interface BuyNowBtnProps {
  onClick: () => void;
}

const BuyNowBtn: React.FC<BuyNowBtnProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      className="min-w-[120px] max-w-[200px] h-11 uppercase bg-bgLightMain text-main text-sm font-semibold rounded-[55px]
            hover:bg-white hover:border hover:border-main transition-all duration-300 ease-in-out"
    >
      Buy now
    </button>
  );
};

export default BuyNowBtn;
