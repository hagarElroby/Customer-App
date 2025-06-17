import React from "react";
interface CouponProps {
  onClick: () => void;
}
const Coupon: React.FC<CouponProps> = ({ onClick }) => {
  return (
    <div className="w-full rounded-s-xl p-4 lg:p-6 bg-white flex items-start flex-col gap-2 lg:gap-3">
      <h3 className="text-sm lg:text-base font-bold text-[#111111]">
        Coupon Code
      </h3>
      <div className="border border-lightBorder rounded-[27px] bg-white relative h-[43px] flex items-center w-full p-2">
        <input
          type="text"
          className="bg-transparent p-2 text-xs lg:text-sm font-normal placeholder-[#797979] text-[#111111] outline-none w-full"
          placeholder="Promo Code"
        />
        <button
          type="submit"
          onClick={onClick}
          className="absolute transform right-1 top-1 bottom-1 w-20 lg:w-[107px] h-auto rounded-[38px] py-1 px-2 lg:px-3 flex items-center justify-center text-xs lg:text-sm font-normal bg-main text-white"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default Coupon;
