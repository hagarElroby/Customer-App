"use client";
import React, { useRef, useState } from "react";
import BestProduct from "../shared/BestProduct";
import SectionTitle from "../shared/SectionTitle";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import RoundedBtnWithIcon from "../shared/RoundedBtnWithIcon";
import { svgs } from "../icons/svgs";
import SortPopup from "../shared/SortPopup";
import { SortType } from "@/types/product";
import FilterPopup from "../shared/FilterPopup";
import { Drawer, Tag } from "antd";
import CustomHeaderInModal from "../shared/CustomHeaderInModal";
import HrLine from "../shared/HrLine";

interface SearchResultProps {
  results: any[];
  onSort: (sortOption: SortType) => void;
  onApplyFilters: (propertyIds: string[], propertyValueIds: string[]) => void;
  onApplyPriceFilter: (min: number, max: number) => void;
  onApplyRating: (rateFrom: number) => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  results,
  onSort,
  onApplyFilters,
  onApplyPriceFilter,
  onApplyRating,
}) => {
  const { totalDocsSearch } = useSelector((state: any) => state.product) || [];
  const searchParams = useSearchParams();
  const searchTermParams = searchParams.get("term") || "Search Results";
  const [sortPopup, setSortPopup] = useState(false);
  const [filterPopup, setFilterPopup] = useState(false);
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
    onApplyFilters(
      updatedSelections.map((item) => item.propertyId),
      updatedSelections.map((item) => item.valueId),
    );
  };

  return (
    <div className="relative">
      <div>
        <SectionTitle title={searchTermParams} resultValue={totalDocsSearch}>
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

      <div className="flex items-start justify-start gap-3 flex-wrap p-10 mx-auto">
        {results.map((result, index) => (
          <BestProduct key={index} {...result} />
        ))}
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
        <HrLine />
        <SortPopup onClose={() => setSortPopup(false)} onSort={onSort} />
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
        <HrLine />
        <FilterPopup
          onClose={() => setFilterPopup(false)}
          onApplyFilters={onApplyFilters}
          onApplyPriceFilter={onApplyPriceFilter}
          onApplyRating={onApplyRating}
          onSelectedValuesChange={handleSelectedValueNames}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </Drawer>
    </div>
  );
};

export default SearchResult;
