import React from "react";

interface ItemTitleProps {
  title: string;
  isArrow?: boolean;
  onMouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const ItemTitle: React.FC<ItemTitleProps> = ({ title, isArrow }) => {
  return (
    <div
      className="py-2 px-4 w-full flex justify-between items-center hover:bg-[#F2F4F5] cursor-pointer group
            text-sm font-normal text-[#5F6C72] hover:text-balckTitle"
    >
      <span className="">{title}</span>
      {isArrow && (
        <svg
          className="w-4 h-4 text-[#191C1F] opacity-0 group-hover:opacity-100 transition-opacity duration-150"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      )}
    </div>
  );
};

export default ItemTitle;
