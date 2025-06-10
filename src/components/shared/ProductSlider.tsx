import React, { useRef, useState } from "react";
import SectionTitle from "./SectionTitle";
import BestProduct from "./BestProduct";
import useResponsiveItemsPerPage from "@/hooks/useResponsiveItemsPerPage";
import ArrowInCircle from "./ArrowInCircle";
import Spinner from "./Spinner";
import { Flex } from "antd";
import { useRouter } from "next/navigation";
import { svgs } from "../icons/svgs";
import { SortType } from "@/types/product";
import useFetchData from "@/hooks/useFetchData";
import { getAllProducts } from "@/services/product";
import { motion } from "framer-motion";

interface ProductSliderProps {
  title: string;
  sortType?: SortType;
  sponsored?: boolean;
}

const ProductSlider: React.FC<ProductSliderProps> = ({
  title,
  sortType,
  sponsored,
}) => {
  const router = useRouter();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const sliderRef = useRef<HTMLDivElement>(null);

  useResponsiveItemsPerPage(setItemsPerPage, {
    375: 2,
    850: 3,
    1200: 4,
    1400: 5,
  });

  const { data, loading, error } = useFetchData({
    apiFunction: getAllProducts,
    params: {
      sort: sortType,
      fromAdminPanel: false,
      ...(sponsored ? { fetchSponsored: true } : {}),
      page: 1,
      limit: 30,
      allowPagination: true,
    },
  });

  const products = data?.docs || [];
  // Divide products into groups based on itemsPerPage
  const productChunks = [];
  for (let i = 0; i < products.length; i += itemsPerPage) {
    productChunks.push(products.slice(i, i + itemsPerPage));
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

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-8 w-full">
      <SectionTitle
        title={title}
        children={
          <Flex
            onClick={() => router.push("/products")}
            style={{ cursor: "pointer" }}
            className="text-main pr-1 text-sm"
            align="center"
            gap={8}
          >
            View all {svgs.rightArrow}
          </Flex>
        }
      />
      <div className="hidden md:flex items-center justify-center relative w-full">
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
            {loading ? (
              <Spinner />
            ) : (
              productChunks.map((chunk, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center gap-[14px]"
                  style={{
                    width: `${100 / totalContainers}%`,
                    flexShrink: 0,
                  }}
                >
                  {chunk.map((product, index) => (
                    <BestProduct
                      key={index}
                      {...product}
                      sponsored={sponsored}
                    />
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

      <motion.div
        ref={scrollContainerRef}
        className="md:hidden overflow-x-auto scroll-smooth scrollbar-hide"
      >
        <div className="flex gap-[14px] px-2 md:px-8 w-full">
          {loading ? (
            <Spinner />
          ) : (
            products.map((product, index) => (
              <BestProduct
                key={index}
                {...product}
                sponsored={sponsored}
                className="flex-shrink-0"
                style={{ width: "167px" }}
              />
            ))
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductSlider;
