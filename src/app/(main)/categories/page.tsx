"use client";

import { usePagination } from "@/utils/paginationUtils";
import React, { useEffect, useState } from "react";
import NoYetImg from "@/components/shared/NoYetImg";
import NoYetText from "@/components/shared/NoYetText";
import PaginationButtons from "@/components/shared/PaginationButtons";
import Loading from "@/components/shared/Loading";
import { getCategories } from "@/services/category";
import { Category } from "@/types/category";
import CategoryItem from "@/components/category/CategoryItem";

const CategoryPage = () => {
  const limit = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState<boolean>();
  const [categories, setCategories] = useState<Category[]>();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(1);
  const { handleNext, handlePrev, handlePageClick } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage,
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await getCategories({
        isActive: true,
        isHoldSubCategory: true,
        page: 1,
        limit,
        allowPagination: true,
        onSuccess: (response) => {
          setCategories(response.docs);
          setTotalDocs(response?.totalDocs || 1);
          setTotalPages(response?.totalPages || 1);
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
        },
      });
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="custom-gap24 w-full flex flex-col min-h-screen">
      {loading && <Loading />}
      {!loading && !categories?.length && (
        <div className="my-6 flex flex-col items-center justify-center">
          <NoYetImg />
          <NoYetText
            title="No Categories Yet!"
            text="When you get Categories, they’ll show up here"
          />
        </div>
      )}
      {!loading && !!categories?.length && (
        <div className="flex flex-col flex-grow overflow-hidden gap-6">
          <div
            className="rounded-3xl hd:rounded-[1.66vw]  bg-white p-6 hd:p-[1.66vw]
                       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 hd:gap-[1.66vw] flex-grow"
          >
            {categories?.map((category: Category) => (
              <CategoryItem key={category._id} item={category} />
            ))}
          </div>
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageClick={handlePageClick}
            onNext={handleNext}
            onPrev={handlePrev}
            limit={limit}
            totalDocs={totalDocs}
          />
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
