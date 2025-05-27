import { Category } from "@/types/category";
import React, { useState } from "react";
import { svgs } from "../icons/svgs";

interface NavigationBarItemProps {
  category: any;
  onClick: (category: Category) => void;
  onMouseEnter: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const NavigationBarItem = ({
  category,
  onClick,
  onMouseEnter,
}: NavigationBarItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);
    onMouseEnter(event);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onClick={() => onClick(category)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`max-w-[250px] min-w-[120px] h-9 py-[9px] px-[14px] flex items-center justify-between gap-[6px] 
                rounded-[18px] overflow-hidden cursor-pointer transition-colors duration-300 
                ${isHovered ? "bg-navigationBg" : "bg-lightNavigationBg"}`}
    >
      <span
        style={{
          display: "-webkit-box",
          WebkitLineClamp: 1,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: "90%",
        }}
        className="text-xs xxl:text-sm font-normal text-itemBlackColor"
      >
        {category.name}
      </span>
      {!!category?.subCategories?.length && <span>{svgs.smallRedArr}</span>}
    </div>
  );
};

export default NavigationBarItem;
