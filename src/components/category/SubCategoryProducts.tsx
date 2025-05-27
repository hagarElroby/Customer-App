"use client";
import BestProduct from "@/components/shared/BestProduct";
import SectionTitle from "@/components/shared/SectionTitle";
import Loading from "@/components/shared/Loading";
import NoYetImg from "@/components/shared/NoYetImg";
import NoYetText from "@/components/shared/NoYetText";
import PaginationButtons from "@/components/shared/PaginationButtons";
import RoundedBtnWithIcon from "@/components/shared/RoundedBtnWithIcon";
import useClickOutside from "@/hooks/useClickOutside";
import FilterPopup from "@/components/shared/FilterPopup";
import SortPopup from "@/components/shared/SortPopup";
import { svgs } from "@/components/icons/svgs";
import { AllProductsDocs, SortType } from "@/types/product";
import { usePagination } from "@/utils/paginationUtils";
import { Drawer, Tag } from "antd";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { cleanParams } from "@/utils/filterUndefined";
import { getAllProducts } from "@/services/product";
import CustomHeaderInModal from "../shared/CustomHeaderInModal";
import HrLine from "../shared/HrLine";

const limit = 15;

const SubCategoryProducts = () => {
  const searchParams = useSearchParams();
  const subCatName = searchParams.get("subCat") || "";
  const subCatId = searchParams.get("id") || "";
  const [sortPopup, setSortPopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);
  const filterRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(sortRef, () => setSortPopup(false));
  useClickOutside(filterRef, () => setFilterPopup(false));
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>();
  const [products, setProducts] = useState<AllProductsDocs[]>([]);

  // Store previous params unless sub cat id changes
  const previousParamsRef = useRef<Record<string, any>>({});
  useEffect(() => {
    // Reset previous params if subCatId changes
    if (subCatId !== previousParamsRef.current.subCategory) {
      previousParamsRef.current = {};
    }
  }, [subCatId]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const payload = cleanParams({
        subCategory: subCatId,
        fromAdminPanel: false,
        page: currentPage,
        limit,
        allowPagination: true,
      });
      await getAllProducts({
        ...payload,
        onSuccess: (data) => {
          setProducts(data.docs);
          setTotalPages(data.totalPages ?? 1);
          setTotalDocs(data.totalDocs ?? 1);
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
        },
      });
    };
    fetchProducts();
  }, [subCatId, currentPage]);

  const { handleNext, handlePrev, handlePageClick } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage,
  );
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const [selectedValues, setSelectedValues] = useState<
    Record<string, string[]>
  >({});

  const [selections, setSelections] = useState<
    {
      propertyId: string;
      valueId: string;
      valueName: string;
    }[]
  >([]);
  // const [selectedNames, setSelectedNames] = useState<string[]>([]);

  //get filter prop names from filter popup to display in tags filter
  const handleSelectedValueNames = (
    newList: { propertyId: string; valueId: string; valueName: string }[],
  ) => {
    // setSelectedNames(newList.map((item) => item.valueName));
    setSelections(newList);
  };

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
      page: currentPage,
      limit,
      allowPagination: true,
      subCategory: subCatId,
    });

    // Update the ref with the new params
    previousParamsRef.current = mergedParams;

    await getAllProducts({
      ...mergedParams,
      onSuccess: (data) => {
        setProducts(data.docs);
        setTotalPages(data.totalPages ?? 1);
        setTotalDocs(data.totalDocs ?? 1);
      },
      onError: (err) => {
        setProducts([]);
      },
    });
  };

  const handleSort = async (sortOption: SortType) => {
    handleApply({ sort: sortOption });
  };

  const handleApplyFilters = async (
    propertyIds: string[],
    propertyValueIds: string[],
  ) => {
    handleApply({ propertyIds, propertyValueIds });
  };

  const handleApplyPriceFilter = async (min: number, max: number) => {
    handleApply({ priceStartFrom: min, priceEndTo: max });
  };

  const handleApplyRating = async (rateFrom: number) => {
    handleApply({ rateFrom });
  };

  const handleTagClose = (valueId: string) => {
    const updatedSelections = selections.filter((s) => s.valueId !== valueId);
    setSelections(updatedSelections);
    // setSelectedNames(updatedSelections.map((item) => item.valueName));
    // handleSelectedValuesChange(updatedSelections);
    // Update selectedValues to remove this valueId
    const updatedSelectedValues: Record<string, string[]> = {};
    updatedSelections.forEach((item) => {
      if (!updatedSelectedValues[item.propertyId]) {
        updatedSelectedValues[item.propertyId] = [];
      }
      updatedSelectedValues[item.propertyId].push(item.valueId);
    });
    setSelectedValues(updatedSelectedValues);
    handleApplyFilters(
      updatedSelections.map((item) => item.propertyId),
      updatedSelections.map((item) => item.valueId),
    );
  };

  return (
    <div>
      {loading && <Loading />}

      {!loading && !products.length && (
        <div className="flex flex-col justify-center items-center h-full overflow-hidden mt-10">
          <NoYetImg />
          <NoYetText
            title="No Products Yet!"
            text="When there are products, they’ll show up here."
          />
        </div>
      )}

      {!loading && !!products.length && (
        <>
          <div className="flex flex-col gap-12">
            <>
              <SectionTitle
                title={subCatName}
                resultValue={totalDocs}
                className="border-b border-[#700C184F] rounded-tr-lg rounded-tl-lg rounded-bl-none rounded-br-none"
              >
                <RoundedBtnWithIcon
                  icon={svgs.redArrowIcon}
                  text="Sort"
                  onClick={() => {
                    setSortPopup(true);
                  }}
                />
                <RoundedBtnWithIcon
                  icon={svgs.filterIcon}
                  text="All filters"
                  onClick={() => setFilterPopup(true)}
                />
              </SectionTitle>
              {/* {!!selectedNames.length && (
                <div className="bg-white h-[58px] p-4 flex items-center gap-4 rounded-br-lg rounded-bl-lg">
                  <span className="text-sm font-medium text-gray1">
                    Filters
                  </span>
                  <span className="bg-gray1 w-[0.5px] h-7"></span>
                  {selectedNames?.map((tag, index) => (
                    <Tag
                      key={tag}
                      closable={index !== 0}
                      className="rounded-full py-[7px] px-[10px] bg-white"
                    >
                      <span>
                        {tag.length > 15 ? `${tag.slice(0, 15)}...` : tag}
                      </span>
                    </Tag>
                  ))}
                </div>
              )} */}
              {!!selections.length && (
                <>
                  <HrLine className="border-lightMain1" />
                  <div className="bg-white h-[58px] p-4 flex items-center gap-4 rounded-br-lg rounded-bl-lg">
                    <span className="text-sm font-medium text-gray1">
                      Filters
                    </span>
                    <span className="bg-gray1 w-[0.5px] h-7"></span>
                    {selections?.map((tag, index) => (
                      <Tag
                        key={tag.valueId}
                        closable={index !== 0}
                        onClose={() => handleTagClose(tag.valueId)}
                        className="rounded-full py-[7px] px-[10px] bg-white"
                      >
                        <span>
                          {tag.valueName.length > 15
                            ? `${tag.valueName.slice(0, 15)}...`
                            : tag.valueName}
                        </span>
                      </Tag>
                    ))}
                  </div>
                </>
              )}
            </>
            <div className="flex items-center flex-wrap gap-3">
              {products.map((product, index) => (
                <BestProduct key={index} {...product} />
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

          <Drawer
            placement="right"
            width={500}
            open={sortPopup}
            onClose={() => setSortPopup(false)}
            closeIcon={false}
            styles={{
              body: {
                padding: 24,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <CustomHeaderInModal
              title="Sort By"
              onClose={() => setSortPopup(false)}
            />
            <SortPopup
              onClose={() => setSortPopup(false)}
              onSort={handleSort}
            />
          </Drawer>
          <Drawer
            placement="right"
            width={500}
            open={filterPopup}
            onClose={() => setFilterPopup(false)}
            styles={{
              body: {
                padding: 24,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
              },
            }}
          >
            <CustomHeaderInModal
              title="Filter"
              onClose={() => setSortPopup(false)}
            />
            <FilterPopup
              onClose={() => setFilterPopup(false)}
              onApplyFilters={handleApplyFilters}
              onApplyPriceFilter={handleApplyPriceFilter}
              onApplyRating={handleApplyRating}
              // onSelectedValueNames={handleSelectedValueNames}
              onSelectedValuesChange={handleSelectedValueNames}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
            />
          </Drawer>
        </>
      )}
    </div>
  );
};

export default SubCategoryProducts;
