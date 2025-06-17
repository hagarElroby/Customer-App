import React from "react";
interface SummeryItemsProps {
  text: string;
  value: string | number;
  isBold?: boolean;
}

const SummeryItem: React.FC<SummeryItemsProps> = ({ text, value, isBold }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <span
        className={`${isBold ? " text-sm lg:text-base font-bold text-[#111111]" : "text-xs lg:text-sm font-medium text-[#484848]"}`}
      >
        {text}
      </span>
      <span
        className={`${isBold ? "text-lg lg:text-2xl font-bold text-[#111111]" : "text-xs lg:text-sm font-normal text-[#484848]"}`}
      >
        {isBold && <sup className="text-sm lg:text-base">IQD</sup>}
        {value}
      </span>
    </div>
  );
};

export default SummeryItem;
