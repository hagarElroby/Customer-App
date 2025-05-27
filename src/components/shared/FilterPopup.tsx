"use client";
import { svgs } from "../icons/svgs";
import { Feature, PriceRange, Value } from "@/types/product";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { stars } from "@/constants/stars";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Loading from "./Loading";
import { cleanParams } from "@/utils/filterUndefined";
import { getFeatures, getTotalProductsNumber } from "@/services/product";
import CustomButton from "./CustomButton";

interface FilterPopupProps {
  onClose: () => void;
  onApplyFilters: (propertyIds: string[], propertyValueIds: string[]) => void;
  onApplyPriceFilter: (min: number, max: number) => void;
  onApplyRating: (rateFrom: number) => void;
  // onSelectedValueNames?: (selectedNames: string[]) => void;
  onSelectedValuesChange?: (
    selections: {
      propertyId: string;
      valueId: string;
      valueName: string;
    }[],
  ) => void;
}

const FilterPopup: React.FC<FilterPopupProps> = ({
  onClose,
  onApplyFilters,
  onApplyPriceFilter,
  onApplyRating,
  // onSelectedValueNames,
  onSelectedValuesChange,
}) => {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    minPrice: 0,
    maxPrice: 0,
  });

  const [totalProducts, setTotalProducts] = useState<number>();
  const searchParams = useSearchParams();
  const searchTermParams = searchParams.get("term") || "";
  const subCatId = searchParams.get("id") || "";
  const [propertyIds, setPropertyIds] = useState<string[]>([]);
  const [propertyValueIds, setPropertyValueIds] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // get features
  useEffect(() => {
    setLoading(true);
    const fetchFeatures = async () => {
      const params = cleanParams({
        productName: searchTermParams,
        subCategory: subCatId,
      });
      await getFeatures({
        ...params,
        onSuccess: (data) => {
          setFeatures(data.features);
          setPriceRange(data.priceRange);
          setPriceRangeValue([
            data.priceRange.minPrice,
            data.priceRange.maxPrice,
          ]);
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
        },
      });
    };
    fetchFeatures();
  }, [searchTermParams, subCatId]);

  // get products number based on features selected
  useEffect(() => {
    const fetchTotalProductsNum = async () => {
      const params = cleanParams({
        productName: searchTermParams,
        subCategory: subCatId,
        propertyIds,
        propertyValueIds,
      });
      await getTotalProductsNumber({
        ...params,
        onSuccess: (data) => {
          if (data == null) {
            setTotalProducts(0);
          }
          setTotalProducts(data.totalProducts);
        },
        onError: (err) => {
          setTotalProducts(0);
        },
      });
    };
    fetchTotalProductsNum();
  }, [searchTermParams, propertyIds, propertyValueIds, subCatId]);

  const [priceRangeValue, setPriceRangeValue] = useState<[number, number]>([
    priceRange.minPrice,
    priceRange.maxPrice,
  ]);

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRangeValue(value as [number, number]);
    }
  };

  const handleInputChange = (type: "min" | "max", value: string) => {
    const numValue = value ? parseInt(value, 10) : 0;
    setPriceRangeValue((prev) =>
      type === "min" ? [numValue, prev[1]] : [prev[0], numValue],
    );
  };
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const [selectedValues, setSelectedValues] = useState<{
    [key: string]: string[];
  }>({});
  const [selectedName, setSelectedName] = useState<string[]>();
  const toggleFeature = (propertyId: string) => {
    setExpandedFeature(expandedFeature === propertyId ? null : propertyId);
  };

  const handleCheckboxChange = (propertyId: string, value: string) => {
    setSelectedValues((prev) => {
      const prevSelected = prev[propertyId] || [];
      const newSelected = prevSelected.includes(value)
        ? prevSelected.filter((item) => item !== value)
        : [...prevSelected, value];

      const updatedSelectedValues = { ...prev, [propertyId]: newSelected };

      // Filter propertyIds to include only those with selected values
      const filteredPropertyIds = Object.entries(updatedSelectedValues)
        .filter(([, values]) => values.length > 0)
        .map(([id]) => id);

      // Flatten the selected propertyValueIds
      const selectedPropertyValueIds = Object.values(
        updatedSelectedValues,
      ).flat();

      // Update state with filtered propertyIds and selected propertyValueIds
      setPropertyIds(filteredPropertyIds);
      setPropertyValueIds(selectedPropertyValueIds);

      return updatedSelectedValues;
    });
  };

  const handleGoButtonClick = () => {
    const [min, max] = priceRangeValue;
    onApplyPriceFilter(min, max);
    onClose();
  };

  const handleViewAll = () => {
    onApplyFilters(propertyIds, propertyValueIds);
    // if (selectedName) {
    //   onSelectedValueNames?.(selectedName);
    // }
    onClose();
  };

  const handleClearFilters = () => {
    // Reset local state
    setSelectedValues({});
    setPropertyIds([]);
    setPropertyValueIds([]);
    setPriceRangeValue([priceRange.minPrice, priceRange.maxPrice]);
    setSelectedRating(null);

    // Trigger parent callbacks with empty/default values
    onApplyFilters([], []);
    onApplyPriceFilter(priceRange.minPrice, priceRange.maxPrice);
    onApplyRating(0);

    // if (onSelectedValueNames) {
    //   onSelectedValueNames([]);
    // }

    onClose();
  };

  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleRadioChange = (ratingIndex: number) => {
    const rateFrom = 6 - ratingIndex;
    setSelectedRating(ratingIndex);
    onApplyRating(rateFrom);
  };

  useEffect(() => {
    // const selectedValueNames: string[] = [];
    const selections: {
      propertyId: string;
      valueId: string;
      valueName: string;
    }[] = [];
    features.forEach((feature) => {
      if (selectedValues[feature.propertyId]) {
        selectedValues[feature.propertyId].forEach((valueId) => {
          const foundValue = feature.values.find((v) => v.valueId === valueId);
          if (foundValue) {
            // selectedValueNames.push(foundValue.valueName);
            selections.push({
              propertyId: feature.propertyId,
              valueId: foundValue.valueId,
              valueName: foundValue.valueName,
            });
          }
        });
      }
    });

    // Pass selected value names to parent
    // if (onSelectedValueNames) {
    //   setSelectedName(selectedValueNames);
    // }
    onSelectedValuesChange?.(selections);
  }, [selectedValues, features]);

  return (
    <div className="h-full">
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col h-full justify-between p-3 m-3">
          {/* Scrollable Section */}
          <div className="flex-grow flex flex-col gap-2 h-[50vh] overflow-y-auto">
            {/* Price Range Filter */}
            <div className="border-b border-borderFilter">
              <div
                onClick={() => toggleFeature("price")}
                className="flex items-center justify-between cursor-pointer px-6 py-4"
              >
                <span className="text-sm font-semibold text-homeHeaders capitalize">
                  Price
                </span>
                <span
                  className={`transform transition-transform duration-300 ${expandedFeature === "price" ? "rotate-180" : ""}`}
                >
                  {svgs.redArrow12}
                </span>
              </div>

              {expandedFeature === "price" && (
                <div className="flex flex-col gap-5 px-6 py-8">
                  {/* Range Slider */}
                  <Slider
                    range
                    min={priceRange?.minPrice}
                    max={priceRange?.maxPrice}
                    value={priceRangeValue}
                    onChange={handleSliderChange}
                    trackStyle={[
                      {
                        backgroundColor: "#700C18",
                        height: 6,
                        borderRadius: 20,
                      },
                    ]}
                    handleStyle={[
                      {
                        backgroundColor: "#992E3B",
                        width: 13,
                        height: 13,
                        borderColor: "#700C18",
                        zIndex: 10,
                      },
                      {
                        backgroundColor: "#992E3B",
                        width: 13,
                        height: 13,
                        border: "none",
                      },
                    ]}
                    keyboard={true}
                    railStyle={{
                      backgroundColor: "#E6E6E6",
                      height: 6,
                      borderRadius: 20,
                    }}
                  />

                  {/* Min & Max Inputs */}
                  <div className="flex gap-4 items-center">
                    <input
                      type="number"
                      value={priceRangeValue[0]}
                      onChange={(e) => handleInputChange("min", e.target.value)}
                      className="border border-filterBorder outline-none text-[#737373] text-sm font-normal
                         rounded-[5px] py-3 px-5 w-full bg-priceRangeBg h-[50px]"
                    />
                    <input
                      type="number"
                      value={priceRangeValue[1]}
                      onChange={(e) => handleInputChange("max", e.target.value)}
                      className="border border-filterBorder rounded-[5px] outline-none text-[#737373] text-sm py-3 px-5 w-full
                         bg-priceRangeBg h-[50px]"
                    />
                    <button
                      onClick={handleGoButtonClick}
                      className="border border-filterBorder rounded-xl py-2 px-4 bg-priceRangeBg h-[50px]"
                    >
                      Go
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b border-borderFilter">
              {/* Accordion Header */}
              <div
                onClick={() => toggleFeature("rating")}
                className="flex items-center justify-between cursor-pointer px-6 py-4"
              >
                <span className="text-sm font-semibold text-homeHeaders capitalize">
                  Product Rating
                </span>
                {/* Toggle Arrow */}
                <span
                  className={`transform transition-transform duration-300 ${expandedFeature === "rating" ? "rotate-180" : ""}`}
                >
                  {svgs.redArrow12}
                </span>
              </div>

              {/* Accordion Content */}
              {expandedFeature === "rating" && (
                <div className="pl-8 pr-6 pb-4 flex flex-col gap-2">
                  {stars.map((star: string, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-[10px] cursor-pointer"
                      onClick={() => handleRadioChange(index + 1)}
                    >
                      {selectedRating === index + 1 ? (
                        <span> {svgs.radioCircleGray}</span>
                      ) : (
                        <span>{svgs.filledRadio}</span>
                      )}
                      <div className="flex gap-[5px]">
                        <span>{svgs.orangeStar}</span>
                        <span className="text-main font-semibold text-xs">
                          {star}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {features?.map((feature: Feature) => (
              <div
                key={feature.propertyId}
                className="border-b border-borderFilter"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleFeature(feature.propertyId)}
                  className="flex items-center justify-between cursor-pointer px-6 py-4"
                >
                  <span className="text-sm font-semibold text-homeHeaders capitalize">
                    {feature.propertName}
                  </span>
                  {/* Toggle Arrow */}
                  <span
                    className={`transform transition-transform duration-300 ${expandedFeature === feature.propertyId ? "rotate-180" : ""}`}
                  >
                    {svgs.redArrow12}
                  </span>
                </div>

                {/* Accordion Content */}
                {expandedFeature === feature.propertyId && (
                  <div className="pl-8 pr-6 pb-4 flex flex-col gap-2">
                    {feature.values.map((value: Value) => (
                      <label
                        key={`${feature.propertyId}-${value.valueId}`}
                        className="flex items-center gap-4 text-sm cursor-pointer"
                        onClick={() =>
                          handleCheckboxChange(
                            feature.propertyId,
                            value.valueId,
                          )
                        }
                      >
                        {/* Show different SVG based on selection */}
                        {selectedValues[feature.propertyId]?.includes(
                          value.valueId,
                        ) ? (
                          // Checked SVG
                          <span> {svgs.checked}</span>
                        ) : (
                          // Unchecked SVG
                          <span>{svgs.unchecked}</span>
                        )}
                        <span className="text-grayLabel font-semibold text-sm">
                          {value.valueName}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-6 mx-6 w-[420px]">
            <CustomButton
              disabled={!totalProducts}
              borderRadius="64px"
              className="capitalize"
              onClick={handleViewAll}
              title={totalProducts ? ` View (${totalProducts})` : "No Results"}
              width="200px"
            />

            {/* </CustomButton> */}
            <CustomButton
              title="Clear all"
              width="200px"
              borderRadius="64px"
              bgColor="#F1DEE1"
              color="#A21F35"
              className="capitalize"
              onClick={handleClearFilters}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPopup;
