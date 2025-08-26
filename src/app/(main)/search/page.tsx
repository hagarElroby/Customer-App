"use client";

import BannerSlider from "@/components/banner/BannerSlider";
import SearchResult from "@/components/search/SearchResult";
import Loading from "@/components/shared/Loading";
import NavigationBar from "@/components/shared/NavigationBar";
import NoYetImg from "@/components/shared/NoYetImg";
import NoYetText from "@/components/shared/NoYetText";
import PaginationButtons from "@/components/shared/PaginationButtons";
import { setProducts, setTotalDocs, setTotalPages } from "@/redux/product";
import { AppDispatch, RootState } from "@/redux/store";
import { getAllProducts } from "@/services/product";
import { SortType } from "@/types/product";
import { FiltersState } from "@/types/productsList";
import { getTempFile, setTempFile } from "@/utils/fileStorage";
import { cleanParams } from "@/utils/filterUndefined";
import { usePagination } from "@/utils/paginationUtils";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const limit = 15;

const page = () => {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const searchTermParams = searchParams.get("term");
  const { products, totalDocs, totalPages } = useSelector(
    (state: RootState) => state.product,
  );
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const file = getTempFile();
  const [sortType, setSortType] = useState<SortType>();
  const [filters, setFilters] = useState<FiltersState>({
    propertyIds: [],
    propertyValueIds: [],
  });

  const { handleNext, handlePrev, handlePageClick } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage,
  );

  // Store previous params unless search term changes
  const previousParamsRef = useRef<Record<string, any>>({});

  useEffect(() => {
    // Reset previous params if the search term changes
    if (searchTermParams !== previousParamsRef.current.productName) {
      previousParamsRef.current = {};
    }
  }, [searchTermParams]);

  // trigger if search term or file changes reset current page
  useEffect(() => {
    setCurrentPage(1);
  }, [file, searchTermParams]);

  const params = useMemo(
    () =>
      cleanParams({
        ...(searchTermParams ? { productName: searchTermParams } : {}),
        ...(file ? { sort: "SIMILARITY" } : {}),
        ...(file ? { file } : {}),
        page: currentPage,
        limit,
        allowPagination: true,
        fromAdminPanel: false,
        sort: sortType,
        ...filters,
      }),
    [currentPage, sortType],
  );

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      await getAllProducts({
        ...params,
        onSuccess: (data) => {
          dispatch(setProducts(data.docs));
          dispatch(setTotalPages(data.totalPages ?? 1));
          dispatch(setTotalDocs(data.totalDocs ?? 1));
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
          toast.error(err.description || "Failed to fetch products");
          dispatch(setProducts([]));
          dispatch(setTotalPages(0));
          dispatch(setTotalDocs(0));
        },
      });
    };
    fetchProducts();
  }, [searchTermParams, currentPage]);

  const pathname = usePathname();
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current === "/search/") {
      setTempFile(null);
      dispatch(setProducts([]));
      dispatch(setTotalPages(0));
      dispatch(setTotalDocs(0));
    }
    prevPath.current = pathname;
  }, [pathname]);

  const handleApply = async (params: {
    sort?: SortType;
    propertyIds?: string[];
    propertyValueIds?: string[];
    priceStartFrom?: number;
    priceEndTo?: number;
    rateFrom?: number;
  }) => {
    // Merge new params with previous ones
    const mergedParams = cleanParams({
      ...previousParamsRef.current,
      ...params,
      fromAdminPanel: false,
      page: 1,
      limit,
      allowPagination: true,
      ...(searchTermParams ? { productName: searchTermParams } : {}),
    });
    setCurrentPage(1);
    setFilters({ ...filters, ...params });

    // Update the ref with the new params
    previousParamsRef.current = mergedParams;

    await getAllProducts({
      ...mergedParams,
      onSuccess: (data) => {
        dispatch(setProducts(data.docs));
        dispatch(setTotalPages(data.totalPages ?? 1));
        dispatch(setTotalDocs(data.totalDocs ?? 1));
      },
      onError: (err) => {
        dispatch(setProducts([]));
      },
    });
  };

  // Sort products
  const handleSort = (sortOption: SortType) => {
    handleApply({ sort: sortOption });
    setSortType(sortOption);
  };

  // Apply filters
  const handleApplyFilters = (
    propertyIds: string[],
    propertyValueIds: string[],
  ) => {
    handleApply({ propertyIds, propertyValueIds });
  };

  // Apply price filter
  const handleApplyPriceFilter = (min: number, max: number) => {
    handleApply({ priceStartFrom: min, priceEndTo: max });
  };

  // Apply rating filter
  const handleApplyRating = (rateFrom: number) => {
    handleApply({ rateFrom });
  };

  return (
    <main className="pb-28 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      <NavigationBar />
      <BannerSlider />

      {loading ? (
        <Loading />
      ) : products.length > 0 ? (
        <div className="flex flex-col gap-10 px-8">
          <SearchResult
            results={products}
            onSort={handleSort}
            onApplyFilters={handleApplyFilters}
            onApplyPriceFilter={handleApplyPriceFilter}
            onApplyRating={handleApplyRating}
          />
          <div className="bg-white sticky bottom-0 z-10">
            <PaginationButtons
              limit={limit}
              totalDocs={totalDocs || 1}
              currentPage={currentPage || 1}
              totalPages={totalPages}
              onNext={handleNext}
              onPrev={handlePrev}
              onPageClick={handlePageClick}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full overflow-hidden mt-10">
          <NoYetImg />
          <NoYetText
            title="No Results For your search"
            text="Try checking your spelling or use more general terms"
          />
        </div>
      )}
    </main>
  );
};

export default page;
