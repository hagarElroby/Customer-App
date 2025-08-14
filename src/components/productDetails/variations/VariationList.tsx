import { Variation, type QuantityAndPrice } from "@/types/product";
import React, { useCallback, useEffect, useRef, useState } from "react";
import VariationItem from "./VariationItem";
import { svgs } from "@/components/icons/svgs";

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
    <div className="bg-white w-[250px] sm:w-[500px] md:w-[700px] lg:w-[56vw] max-w-[850px] rounded-3xl p-6 flex flex-col gap-3">
      <h3 className="text-xl font-normal text-headColor">Item options</h3>
      <div className="relative flex items-center justify-between w-full">
        {canScrollLeft && (
          <button
            onClick={() => scrollThumbnails("left")}
            className="absolute left-0 z-10 h-full cursor-pointer w-20 
                     bg-[linear-gradient(to_left,#FFFFFF00,#FFFFFFED,#FFFFFF)]
                     flex items-center justify-start px-2"
          >
            <span>{svgs.left}</span>
          </button>
        )}

        <div
          ref={thumbnailRef}
          style={{ direction: "ltr" }}
          className="flex items-center justify-center gap-2 w-[90vw] mx-auto overflow-x-auto h-full scrollbar-hide px-2"
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
            className="absolute right-0 z-10 h-full cursor-pointer w-20 
                     bg-[linear-gradient(to_right,#FFFFFF00,#FFFFFFED,#FFFFFF)]
                     flex items-center justify-end px-2"
          >
            <span>{svgs.right}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default VariationList;
