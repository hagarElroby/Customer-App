import React from "react";
import TextBadge from "../ads/TextBadge";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";

interface ProductCardProps {
  src: string;
  text: string;
  desc: string;
  price: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  src,
  text,
  desc,
  price,
}) => {
  return (
    <div className="bg-grayHome rounded-md p-5 w-full h-[100px] flex items-center justify-between overflow-hidden">
      <div className="flex items-center gap-4 overflow-hidden w-full">
        <div className="w-[60px] h-[60px] flex-shrink-0">
          <img
            src={src}
            alt={text}
            className="w-full h-full block object-cover rounded"
          />
        </div>
        <div className="flex flex-col justify-between h-full overflow-hidden w-[calc(100%-60px-1rem)]">
          <div className="flex flex-col gap-1 overflow-hidden max-w-[calc(100%-80px)]">
            <div className="max-w-full truncate">
              <TextBadge text={text} />
            </div>
            <p className="text-sm text-homeHeaders font-bold leading-tight line-clamp-3 max-h-[3.6em] overflow-hidden">
              {desc}
            </p>
          </div>
        </div>
      </div>

      {/* Price */}
      <span className="text-homeHeaders font-bold text-base ml-4 whitespace-nowrap">
        IQD {formatToTwoDecimals(price)}
      </span>
    </div>
  );
};

export default ProductCard;
