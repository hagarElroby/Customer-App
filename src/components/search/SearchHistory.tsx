// components/SearchHistory.tsx
"use client";

import React from "react";
import { svgs } from "../icons/svgs";

type SearchHistoryItem = {
  productName: string;
};

type Props = {
  data: SearchHistoryItem[];
  onClear: () => void;
  onItemClick: (productName: string) => void;
};

const SearchHistory: React.FC<Props> = ({ data, onClear, onItemClick }) => {
  if (!data.length) return null;

  return (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-xs font-medium text-[#666666]">
        Your search history{" "}
        <span className="underline cursor-pointer" onClick={onClear}>
          Clear
        </span>
      </p>

      {data.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-4 cursor-pointer hover:bg-lightNavigationBg"
          onClick={() => onItemClick(item.productName)}
        >
          <p className="text-sm font-normal flex gap-1 items-center">
            <span className="line-clamp-1">
              <span className="font-medium">{item.productName}</span>
            </span>
          </p>
          <span>{svgs.searchArrow}</span>
        </div>
      ))}
    </div>
  );
};

export default SearchHistory;
