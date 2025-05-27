import React from "react";

const SmallRoundedCont = ({
  children,
  className = "",
  isGrayBg = false,
}: {
  children: React.ReactNode;
  className?: string;
  isGrayBg?: boolean;
}) => {
  return (
    <div
      className={`w-[81px] h-5 rounded-[30px] ${isGrayBg ? "bg-[#D1D1D1]" : "bg-main"} flex items-center justify-center px-2 py-1 ${className}`}
    >
      {children}
    </div>
  );
};

export default SmallRoundedCont;
