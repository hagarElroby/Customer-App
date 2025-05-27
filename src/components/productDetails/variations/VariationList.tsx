import { Variation, type QuantityAndPrice } from "@/types/product";
import React, { useCallback, useEffect, useRef, useState } from "react";
import VariationItem from "./VariationItem";

const VariationList = ({
  variations,
  selectedVariationName,
  onVariationClick,
}: {
  variations: QuantityAndPrice[];
  selectedVariationName: string;
  onVariationClick: (variation: QuantityAndPrice) => void;
}) => {
  const thumbnailRef = useRef<HTMLDivElement>(null);
  // Check if scrolling is possible based on the number of images
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(() => {
    return variations.length > 4;
  });

  const updateScrollButtons = useCallback(() => {
    if (thumbnailRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = thumbnailRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
    }
  }, []);

  useEffect(() => {
    const ref = thumbnailRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateScrollButtons);
      return () => ref.removeEventListener("scroll", updateScrollButtons);
    }
  }, [updateScrollButtons]);

  const scrollThumbnails = (direction: "left" | "right") => {
    if (thumbnailRef.current) {
      const scrollAmount = 250;
      thumbnailRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-white w-[250px] sm:w-[500px] md:w-[700px] lg:w-[56vw] max-w-[1000px] rounded-3xl p-6 flex flex-col gap-3">
      <h3 className="text-xl font-normal text-headColor">Item options</h3>
      <div className="flex items-center gap-2 w-full">
        {canScrollLeft && (
          <button
            onClick={() => scrollThumbnails("left")}
            className={`cursor-pointer py-7 px-8 bg-custom-gradientHomeR flex items-center justify-center"}`}
          >
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
              <path
                d="M10 1L1 10L10 19"
                stroke="#700C18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
        <div
          ref={thumbnailRef}
          style={{ direction: "ltr" }}
          className="flex gap-2 w-[90vw] mx-auto overflow-x-auto h-full scrollbar-hide px-2"
        >
          {variations.map((variation) => (
            <VariationItem
              isSelected={variation.groupName === selectedVariationName}
              key={variation.groupName}
              variation={variation}
              onClick={() => onVariationClick(variation)}
            />
          ))}
        </div>
        {canScrollRight && (
          <button
            onClick={() => scrollThumbnails("right")}
            className={`cursor-pointer py-7 px-8 bg-custom-gradientHomeL flex items-center justify-center`}
          >
            <svg width="11" height="20" viewBox="0 0 11 20" fill="none">
              <path
                d="M1 1L10 10L1 19"
                stroke="#700C18"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default VariationList;
