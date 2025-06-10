import React, { useState, useRef } from "react";
import NavigationBarItem from "./NavigationBarItem";
import Spinner from "./Spinner";
import SubCatMenu from "./SubCatMenu";
import useResponsiveItemsPerPage from "@/hooks/useResponsiveItemsPerPage";
import { useRouter } from "next/navigation";
import { Category } from "@/types/category";
import { Popover } from "antd";
import { getCategories } from "@/services/category";
import useFetchData from "@/hooks/useFetchData";
import { svgs } from "../icons/svgs";

const NavigationBar = () => {
  const router = useRouter();
  const [currentOffset, setCurrentOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [subCat, setSubCat] = useState<any[]>([]);

  const { data, loading, error } = useFetchData({
    apiFunction: getCategories,
    params: {
      isActive: true,
      isHoldSubCategory: true,
      page: 1,
      limit: 30,
      allowPagination: true,
    },
  });

  const categories = data?.docs || [];

  useResponsiveItemsPerPage(setItemsPerPage, {
    768: 4,
    850: 5,
    1024: 6,
    1280: 8,
    1440: 10,
  });

  // Divide categories into groups based on itemsPerPage
  const categoryChunks = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) {
    categoryChunks.push(categories.slice(i, i + itemsPerPage));
  }

  const totalContainers = categoryChunks.length;

  const handleMouseEnter = (category: Category) => {
    setSubCat(category.subCategories);
  };

  const handleClickCategory = (category: Category) => {
    router.push(`/category?category=${category.name}&id=${category._id}`);
  };

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

  return (
    <div className="hidden md:flex py-5 md:border-b-[0.5px] md:border-[#00000040] w-full items-center justify-between gap-[14px] relative h-[76px]">
      {loading && <Spinner />}
      {!loading && !error && (
        <>
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className={`cursor-pointer py-7 px-8 bg-custom-gradientHomeR flex items-center justify-center ${
              currentOffset > 0 ? "opacity-1" : "opacity-0"
            }`}
          >
            <span>{svgs.leftRedArr}</span>
          </button>

          {/* Category Slider */}
          <div className="overflow-hidden w-full relative" ref={sliderRef}>
            <div
              className="categories-wrapper flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${(currentOffset / totalContainers) * 100}%)`,
                width: `${totalContainers * 100}%`,
                display: "flex",
              }}
            >
              {categoryChunks.map((chunk, chunkIndex) => (
                <div
                  key={chunkIndex}
                  className="category-container flex items-center justify-center gap-[14px] px-3"
                  style={{
                    width: `${100 / totalContainers}%`,
                    flexShrink: 0,
                  }}
                >
                  {chunk.map((category: any, index: any) => (
                    <Popover
                      key={index}
                      content={<SubCatMenu subCat={subCat} />}
                      title={category.name}
                      trigger="hover"
                    >
                      <div>
                        <NavigationBarItem
                          category={category}
                          onClick={handleClickCategory}
                          onMouseEnter={() => handleMouseEnter(category)}
                        />
                      </div>
                    </Popover>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className={`cursor-pointer py-7 px-8 bg-custom-gradientHomeL flex items-center justify-center ${
              currentOffset < totalContainers - 1 ? "opacity-1" : "opacity-0"
            }`}
          >
            <span>{svgs.rightRedArr}</span>
          </button>
        </>
      )}
    </div>
  );
};

export default NavigationBar;
