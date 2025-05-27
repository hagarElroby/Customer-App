import React, { useEffect, useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import BestProduct from "./BestProduct";
import useResponsiveItemsPerPage from "@/hooks/useResponsiveItemsPerPage";
import ArrowInCircle from "./ArrowInCircle";
import Spinner from "./Spinner";
import { Flex } from "antd";
import { useRouter } from "next/navigation";
import { svgs } from "../icons/svgs";
import { AllProductsDocs, SortType } from "@/types/product";
import useFetchData from "@/hooks/useFetchData";
import { getAllProducts } from "@/services/product";
import { BrowseObject } from "@/types/browses";
import { getPreviouslyBrowsed } from "@/services/browses";

const PreviouslyBrowsed = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [browseData, setBrowseData] = useState<BrowseObject[]>([]);
  const [loadingBrowse, setLoadingBrowse] = useState(false);

  useEffect(() => {
    const fetchBrowses = async () => {
      setLoadingBrowse(true);
      await getPreviouslyBrowsed({
        page: 1,
        limit: 30,
        allowPagination: true,
        onSuccess: (data) => {
          setBrowseData(data.docs);
          setLoadingBrowse(false);
        },
        onError: () => {
          setLoadingBrowse(false);
        },
      });
    };

    fetchBrowses();
  }, []);

  useResponsiveItemsPerPage(setItemsPerPage, {
    540: 2,
    850: 3,
    1024: 4,
    1400: 5,
  });

  // Divide products into groups based on itemsPerPage
  const productChunks = [];
  for (let i = 0; i < browseData.length; i += itemsPerPage) {
    productChunks.push(browseData.slice(i, i + itemsPerPage));
  }
  const totalContainers = productChunks.length;

  const handleNext = () => {
    if (currentOffset < totalContainers - 1) {
      setCurrentOffset((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentOffset > 0) {
      setCurrentOffset((prev) => prev - 1);
    }
  };

  if (browseData.length === 0 && !loadingBrowse) {
    return null;
  }

  return (
    <div className="flex flex-col gap-8">
      <SectionTitle title="Previously browsed products" />
      <div className="flex items-center justify-center gap-3 relative">
        {/* Left Arrow */}
        <div
          onClick={handlePrev}
          className={`cursor-pointer absolute left-0 z-10 ${
            currentOffset > 0 ? "opacity-1" : "opacity-0"
          }`}
        >
          <ArrowInCircle dir="left" />
        </div>

        {/* Products */}
        <div ref={sliderRef} className="overflow-hidden relative w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${(currentOffset / totalContainers) * 100}%)`,
              width: `${totalContainers * 100}%`,
            }}
          >
            {loadingBrowse ? (
              <Spinner />
            ) : (
              productChunks.map((chunk, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-[14px] px-3"
                  style={{
                    width: `${100 / totalContainers}%`,
                    flexShrink: 0,
                  }}
                >
                  {chunk.map((product, index) => (
                    <BestProduct key={index} {...product} />
                  ))}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Arrow */}
        <div
          onClick={handleNext}
          className={`cursor-pointer absolute z-10 right-0 ${
            currentOffset < totalContainers - 1 ? "opacity-1" : "opacity-0"
          }`}
        >
          <ArrowInCircle dir="right" />
        </div>
      </div>
    </div>
  );
};

export default PreviouslyBrowsed;
