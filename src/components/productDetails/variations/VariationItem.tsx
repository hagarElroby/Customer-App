import { QuantityAndPrice } from "@/types/product";
import React from "react";

const VariationItem = ({
  variation,
  isSelected,
  onClick,
}: {
  variation: QuantityAndPrice;
  isSelected: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={`min-w-[250px] max-w-[250px] h-32 overflow-x-hidden overflow-y-auto p-3 rounded-md flex border mb-1 
    items-center justify-between gap-3 ${isSelected ? " border-main bg-lightMain3" : "border-lightBlue1 bg-lightBlue1"}`}
      onClick={onClick}
    >
      <div className="h-20 min-w-20 max-w-20 overflow-hidden flex items-start justify-center">
        <img
          src={variation.productImages[0]}
          alt="product image"
          className={`w-full h-full object-cover`}
        />
      </div>
      <div className="flex flex-col gap-1 w-full mt-4">
        {variation.variation.map((va, index) => (
          <div className="flex items-center justify-between" key={index}>
            <span key={va.key} className="text-[#404553] font-medium text-xs">
              {va.propertyName}:{" "}
            </span>
            <span className="w-16 h-4 p-1 bg-lightMain2 rounded-[50px] flex items-center justify-center text-redText font-medium text-[10px] overflow-hidden whitespace-nowrap">
              {va.propertyValueName} {va.unitName}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VariationItem;
