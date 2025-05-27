import { svgs } from "../icons/svgs";
import React from "react";

interface CheckoutProps {
  onClick: () => void;
}

const CheckoutBtn: React.FC<CheckoutProps> = ({ onClick }) => {
  return (
    <div>
      <button
        type="submit"
        onClick={onClick}
        className="w-full h-[50px] rounded-xl p-5 bg-main text-white font-bold text-sm
      flex items-center justify-center hover:bg-white hover:text-main hover:border hover:border-main transition-all duration-300"
      >
        Proceed to Checkout <span className="ml-3">{svgs.rightWhiteArrow}</span>
      </button>
      <button
        //TODO: redirect to Privacy Policy page when it available
        onClick={() => ""}
        className="text-[#484848] text-xs font-normal underline mt-3 cursor-pointer"
      >
        By clicking "check out" you're agreeing to our  Privacy Policy
      </button>
    </div>
  );
};

export default CheckoutBtn;
