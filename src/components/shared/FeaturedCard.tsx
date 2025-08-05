import React from "react";

interface FeaturedCardProps {
  src: string;
  alt: string;
  desc: string;
  price: string;
  width?: string;
  height?: string;
}

const FeaturedCard: React.FC<FeaturedCardProps> = ({
  src,
  alt,
  desc,
  price,
  width,
  height,
}) => {
  return (
    <div
      style={{ width: width, height: height }}
      className="p-2 gap-3 rounded-[3px] border border-homeBorderCard flex items-center justify-between"
    >
      <div className="w-[30vw] h-full">
        <img src={src} alt={alt} className="w-full h-full object-contain" />
      </div>
      <div className="flex flex-col items-start justify-between h-full w-[70vw]">
        <p className="text-balckTitle font-normal text-sm">{desc}</p>
        <span className="text-sm font-semibold text-main">{price}</span>
      </div>
    </div>
  );
};

export default FeaturedCard;
