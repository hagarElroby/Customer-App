import { useState, useRef, useEffect } from "react";
import { ProductProperty, QuantityAndPrice } from "@/types/product";
import { space } from "postcss/lib/list";

interface SpecificationsProps {
  specifications: ProductProperty[];
  selectedVariation?: QuantityAndPrice;
}

const Specifications: React.FC<SpecificationsProps> = ({
  specifications,
  selectedVariation,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [rowData, setRowData] = useState<{ label: string; value: string }[]>(
    [],
  );
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight,
      ); // Compare with max height
    }
  }, [specifications]);

  useEffect(() => {
    const rowsData: { label: string; value: string }[] = [];
    specifications.forEach((spec) => {
      const variationMatch = selectedVariation?.variation.find(
        (p) => p.propertyName === spec.propertyName,
      );

      if (variationMatch) {
        rowsData.push({
          label: spec.propertyName,
          value: variationMatch.propertyValueName,
        });
      } else {
        spec.propertyValue.forEach((value) => {
          rowsData.push({
            label: spec.propertyName,
            value: value.valueName,
          });
        });
      }
    });
    setRowData(rowsData);
  }, [specifications, selectedVariation]);

  return (
    <div
      ref={contentRef}
      className={`flex-[1] w-full min-w-[250px] max-w-[700px] h-[446px] ${isExpanded ? "max-h-[1000px]" : "max-h-[446px]"}
     bg-white rounded-3xl py-5 px-8 relative flex flex-col items-start gap-8`}
    >
      <div className="w-full border-b border-bgLightMain relative h-10">
        <span className="font-bold text-base text-main border-b-[2px] border-main py-3 absolute left-0 bottom-0">
          Specifications
        </span>
      </div>

      {/* Content with dynamic height */}
      <div
        className={`w-full overflow-hidden transition-all duration-300 h-full"
          }`}
      >
        {rowData.map(({ value, label }, index) => (
          <div
            key={`${label}-${value}`}
            className={`w-full h-8 p-2 flex items-center transition-all duration-300 ${
              index % 2 === 0 ? "bg-[#700c180a]" : "bg-white"
            }`}
          >
            <div className="flex items-center justify-start flex-[1]">
              <p className="text-[#7E859B] text-xs font-normal">{label}</p>
            </div>
            <div className="flex items-center justify-start flex-[1]">
              <p className="text-[#404553] text-xs font-normal">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Show button only if content overflows */}
      {isOverflowing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-profileLabel font-normal text-sm self-center transition-all duration-300 hover:underline"
        >
          {isExpanded ? "See Less" : "See More"}
        </button>
      )}
    </div>
  );
};

export default Specifications;
