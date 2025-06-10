import { Category, SubCategory } from "@/types/category";
import React from "react";

interface CategoryCardProps {
  src: string;
  alt: string;
  title: string;
  bgColor: string;
  subCategory?: SubCategory;
  onClick?: (sub: SubCategory | Category) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  src,
  alt,
  title,
  bgColor,
  subCategory,
  onClick,
}) => {
  return (
    <div
      onClick={() => subCategory && onClick && onClick(subCategory)}
      className="flex flex-col gap-3 md:gap-6 items-center cursor-pointer"
    >
      <div
        className={`w-[83px] h-[83px] md:w-[130px] md:h-[130px] flex items-center justify-center overflow-hidden rounded-md`}
        style={{ backgroundColor: bgColor }}
      >
        {" "}
        <img src={src} alt={alt} className="object-cover w-[90%] h-[90%]" />
      </div>
      <h3 className="text-homeHeaders font-medium text-xs md:font-semibold md:text-base overflow-hidden line-clamp-1">
        {title}
      </h3>
    </div>
  );
};

export default CategoryCard;
