import React, { useRef, useState } from "react";
import SectionTitle from "../shared/SectionTitle";
import CategoryCard from "./CategoryCard";
import ArrowInCircle from "../shared/ArrowInCircle";
import useResponsiveItemsPerPage from "@/hooks/useResponsiveItemsPerPage";
import useFetchData from "@/hooks/useFetchData";
import Spinner from "../shared/Spinner";
import { bgColors } from "@/constants/colors";
import { useRouter } from "next/navigation";
import { Category, SubCategory } from "@/types/category";
import { svgs } from "../icons/svgs";
import { Flex } from "antd";
import { getCategories } from "@/services/category";

const PopularCategories = () => {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  useResponsiveItemsPerPage(setItemsPerPage, { 768: 4, 1024: 8, 1440: 10 });
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

  // Divide categories into groups based on itemsPerPage
  const categoryChunks = [];
  for (let i = 0; i < categories.length; i += itemsPerPage) {
    categoryChunks.push(categories.slice(i, i + itemsPerPage));
  }

  const totalContainers = categoryChunks.length;

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

  const handleClickCategory = (category: Category | SubCategory) => {
    router.push(`/category?category=${category.name}&id=${category._id}`);
  };

  return (
    <div className="flex flex-col gap-2">
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <SectionTitle
            title="Popular Categories"
            children={
              <Flex
                onClick={() => router.push("/categories")}
                style={{ cursor: "pointer" }}
                className="text-main pr-1 text-sm"
                align="center"
                gap={8}
              >
                View all {svgs.rightArrow}
              </Flex>
            }
          />
          <div className="flex items-center justify-center relative h-[272px]">
            {/* Left Arrow */}
            <div
              onClick={handlePrev}
              className={`cursor-pointer absolute left-0 z-10 ${currentOffset > 0 ? "opacity-1" : "opacity-0"}`}
            >
              <ArrowInCircle dir="left" />
            </div>

            {/* Categories */}
            <div ref={sliderRef} className="overflow-hidden w-full relative">
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
                      <CategoryCard
                        key={index}
                        src={category.icon || category.image}
                        alt="A stylish watch"
                        title={category.name}
                        bgColor={bgColors[index % bgColors.length]}
                        subCategory={category}
                        onClick={handleClickCategory}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Arrow */}
            <div
              onClick={handleNext}
              className={`cursor-pointer absolute z-10 right-0 
    ${currentOffset < totalContainers - 1 ? "opacity-1" : "opacity-0"}`}
            >
              <ArrowInCircle dir="right" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PopularCategories;
