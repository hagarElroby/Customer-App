"use client";
import NavigationBar from "@/components/shared/NavigationBar";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Loading from "@/components/shared/Loading";
import { ProductResponse, SortType } from "@/types/productsList";
import BannerSlider from "@/components/banner/BannerSlider";
import PaginationButtons from "@/components/shared/PaginationButtons";
import { usePagination } from "@/utils/paginationUtils";
import NoYetImg from "@/components/shared/NoYetImg";
import NoYetText from "@/components/shared/NoYetText";
import BestProduct from "@/components/shared/BestProduct";
import { Category, SubCategory } from "@/types/category";
import Spinner from "@/components/shared/Spinner";
import CategoryCard from "@/components/category/CategoryCard";
import { bgColors } from "@/constants/colors";
import { useRouter } from "next/navigation";
import HrLine from "@/components/shared/HrLine";
import { cleanParams } from "@/utils/filterUndefined";
import SectionTitle from "@/components/shared/SectionTitle";
import RoundedBtnWithIcon from "@/components/shared/RoundedBtnWithIcon";
import { Drawer, Tag } from "antd";
import SortPopup from "@/components/shared/SortPopup";
import FilterPopup from "@/components/shared/FilterPopup";
import { getAllProducts } from "@/services/product";
import { svgs } from "@/components/icons/svgs";
import { getSubcategoriesHavingProducts } from "@/services/category";
import CustomHeaderInModal from "@/components/shared/CustomHeaderInModal";
const limit = 15;
const ProductsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [subCatId, setSubCatId] = useState<string>("");
  const [loadingSub, setLoadingSub] = useState<boolean>(false);
  const [sortPopup, setSortPopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
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

  const previousParamsRef = useRef<Record<string, any>>({});

  const { handleNext, handlePrev, handlePageClick } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage,
  );

  //get sub categories list
  useEffect(() => {
    const fetchData = async () => {
      setLoadingSub(true);
      await getSubcategoriesHavingProducts({
        onSuccess: (response) => {
          setSubCategories(response.docs);
          setLoadingSub(false);
        },
        onError: (err) => {
          setLoadingSub(false);
        },
      });
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const params = cleanParams({
        subCategory: subCatId,
        fromAdminPanel: false,
        page: currentPage,
        limit,
        allowPagination: true,
      });
      await getAllProducts({
        ...params,
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
  }, [currentPage, subCatId]);

  const handleClickSubCategory = (subCategory: SubCategory | Category) => {
    setSubCatId(subCategory._id);
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

  // Sort products
  const handleSort = (sortOption: SortType) => {
    handleApply({ sort: sortOption });
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
    <main className=" pb-28 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      <NavigationBar />
      <div className="flex flex-col gap-10 px-8">
        <BannerSlider />
        <div>
          <SectionTitle title="best selling">
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
            <>
              <HrLine className="border-lightMain1" />
              <div className="bg-white h-[58px] p-4 flex items-center gap-4 rounded-br-lg rounded-bl-lg">
                <span className="text-sm font-medium text-gray1">Filters</span>
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
            </>
          )} */}
          {!!selections.length && (
            <>
              <HrLine className="border-lightMain1" />
              <div className="bg-white h-[58px] p-4 flex items-center gap-4 rounded-br-lg rounded-bl-lg">
                <span className="text-sm font-medium text-gray1">Filters</span>
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
        </div>
        <div className="flex items-center gap-3 justify-center flex-wrap">
          {loadingSub && <Spinner />}

          {!loadingSub &&
            !!subCategories.length &&
            subCategories?.map((sub: SubCategory, index) => (
              <CategoryCard
                key={index}
                src={sub.image}
                alt={sub.name}
                title={sub.name}
                bgColor={bgColors[index % bgColors.length]}
                subCategory={sub}
                onClick={handleClickSubCategory}
              />
            ))}
        </div>
        <HrLine />
        {loading && <Loading />}

        {!loading && !!products.length && (
          <>
            <div className="flex flex-wrap gap-3 items-center justify-start">
              {products.map((product, index) => (
                <BestProduct {...product} key={index} />
              ))}
            </div>
            <div className="bg-white sticky bottom-0 z-10">
              <PaginationButtons
                limit={limit}
                totalDocs={totalDocs}
                currentPage={currentPage || 1}
                totalPages={totalPages}
                onNext={handleNext}
                onPrev={handlePrev}
                onPageClick={handlePageClick}
              />
            </div>
          </>
        )}

        {!loading && !products.length && (
          <div className="flex flex-col items-center justify-center h-full overflow-hidden mt-10">
            <NoYetImg />
            <NoYetText
              title="No Products Yet"
              text="When there is products , they will show up here"
            />
          </div>
        )}
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
        <SortPopup onClose={() => setSortPopup(false)} onSort={handleSort} />
      </Drawer>
      <Drawer
        placement="right"
        width={500}
        open={filterPopup}
        onClose={() => setFilterPopup(false)}
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
          title="Filter"
          onClose={() => setSortPopup(false)}
        />
        <FilterPopup
          onClose={() => setFilterPopup(false)}
          onApplyFilters={handleApplyFilters}
          onApplyPriceFilter={handleApplyPriceFilter}
          onApplyRating={handleApplyRating}
          onSelectedValuesChange={handleSelectedValueNames}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </Drawer>
    </main>
  );
};

export default ProductsPage;
