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
      className="flex flex-col gap-8 items-center cursor-pointer"
    >
      <div
        className={`w-[130px] h-[130px] flex items-center justify-center overflow-hidden rounded-md`}
        style={{ backgroundColor: bgColor }}
      >
        {" "}
        <img src={src} alt={alt} className="object-cover w-[75%] h-[75%]" />
      </div>
      <h3 className="text-homeHeaders font-semibold text-base overflow-hidden line-clamp-1">
        {title}
      </h3>
    </div>
  );
};

export default CategoryCard;
