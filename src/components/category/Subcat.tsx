"use client";
import React, { useEffect, useState } from "react";
import SectionTitle from "@/components/shared/SectionTitle";
import CategoryCard from "@/components/category/CategoryCard";
import ArrowInCircle from "@/components/shared/ArrowInCircle";
import useResponsiveItemsPerPage from "@/hooks/useResponsiveItemsPerPage";
import { bgColors } from "@/constants/colors copy";
import { useRouter, useSearchParams } from "next/navigation";
import { Category, SubCategory } from "@/types/category";
import { getCategories } from "@/services/category";
import Spinner from "@/components/shared/Spinner";

const Subcat = () => {
  const router = useRouter();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category");
  const categoryId = searchParams.get("id");
  useResponsiveItemsPerPage(setItemsPerPage, { 768: 4, 1024: 8, 1440: 10 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      await getCategories({
        isHoldSubCategory: true,
        categoryId: categoryId ?? undefined,
        page: 1,
        limit: 30,
        allowPagination: true,
        onSuccess: (response) => {
          setSubCategories(response.docs[0].subCategories);
          setLoading(false);
        },
        onError: (err) => {
          setError(err.description);
          setLoading(false);
        },
      });
    };

    fetchData();
  }, [categoryId]);

  const subcategoryChunks = [];
  for (let i = 0; i < subCategories.length; i += itemsPerPage) {
    subcategoryChunks.push(subCategories.slice(i, i + itemsPerPage));
  }
  const totalContainers = subcategoryChunks.length;

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

  const handleClickSubCategory = (subCategory: SubCategory | Category) => {
    router.push(
      `/category/subCat?subCat=${subCategory.name}&id=${subCategory._id}`,
    );
  };

  return (
    <div className="flex flex-col gap-8">
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <SectionTitle title={`${categoryName} Subcategories`} />
          <div className="flex items-center justify-center relative h-[272px]">
            {/* Left Arrow */}
            <div
              onClick={handlePrev}
              className={`cursor-pointer absolute left-0 z-10 ${currentOffset > 0 ? "opacity-1" : "opacity-0"}`}
            >
              <ArrowInCircle dir="left" />
            </div>

            {/* Categories */}
            <div className="overflow-hidden w-full relative">
              <div
                className="categories-wrapper flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${(currentOffset / totalContainers) * 100}%)`,
                  width: `${totalContainers * 100}%`,
                  display: "flex",
                }}
              >
                {subcategoryChunks.map((chunk, chunkIndex) => (
                  <div
                    key={chunkIndex}
                    className="category-container flex items-center justify-center gap-[14px] px-3"
                    style={{
                      width: `${100 / totalContainers}%`,
                      flexShrink: 0,
                    }}
                  >
                    {chunk.map((sub: any, index: any) => (
                      <CategoryCard
                        key={index}
                        src={sub.icon || sub.image}
                        alt="A stylish watch"
                        title={sub.name}
                        bgColor={bgColors[index % bgColors.length]}
                        subCategory={sub}
                        onClick={handleClickSubCategory}
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

export default Subcat;
