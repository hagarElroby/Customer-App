"use client";
import { svgs } from "../icons/svgs";
import { SortType } from "@/types/product";
import { Button } from "antd";
import React, { useState } from "react";
interface SortPopupProps {
  onClose: () => void;
  onSort: (sortOption: SortType) => void;
}

interface SortOption {
  label: string;
  value:
    | "POPULARITY"
    | "NEWEST"
    | "PRICE_LOW_TO_HIGH"
    | "PRICE_HIGH_TO_LOW"
    | "BEST_SELLER"
    | "SIMILARITY";
}

const sortOptions: SortOption[] = [
  { label: "Popularity", value: "POPULARITY" },
  { label: "Newest", value: "NEWEST" },
  { label: "Price : Low to High", value: "PRICE_LOW_TO_HIGH" },
  { label: "Price : High to Low", value: "PRICE_HIGH_TO_LOW" },
  { label: "Best Seller", value: "BEST_SELLER" },
  { label: "Similarity", value: "SIMILARITY" },
];

const SortPopup: React.FC<SortPopupProps> = ({ onClose, onSort }) => {
  const [selected, setSelected] = useState<SortType | null>(null);

  const handleSort = () => {
    if (selected) {
      onSort(selected);
      onClose();
    }
  };

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex-grow flex flex-col gap-4 mt-3 h-[60vh] overflow-y-auto">
        {sortOptions.map((option) => (
          <div
            onClick={() => setSelected(option.value)}
            key={option.value}
            className="flex items-center justify-between cursor-pointer p-2"
          >
            <label className="text-base font-semibold text-homeHeaders">
              {option.label}
            </label>
            {selected === option.value ? svgs.filledRadiButton : svgs.radioBtn}
          </div>
        ))}
      </div>
      <Button
        type="primary"
        shape="round"
        size="large"
        className="bg-main hover:!bg-main hover:opacity-85"
        onClick={handleSort}
      >
        Sort
      </Button>
    </div>
  );
};

export default SortPopup;
