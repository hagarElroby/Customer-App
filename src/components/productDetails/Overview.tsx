import { useEffect, useRef, useState } from "react";

interface OverviewProps {
  description: string[];
}

const Overview: React.FC<OverviewProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(
        contentRef.current.scrollHeight > contentRef.current.clientHeight,
      );
    }
  }, [description, isExpanded]);
  return (
    <div
      className={`flex-[1] w-full h-[446px] overflow-hidden min-w-[250px] max-w-[700px] bg-white rounded-3xl py-5 px-8 relative flex
     flex-col items-start gap-8`}
    >
      <div className={`w-full border-b border-bgLightMain relative h-10`}>
        <span className="font-bold text-base text-main border-b-[2px] border-main py-3 absolute left-0 bottom-0">
          Overview
        </span>
      </div>
      <div className="flex flex-col items-center gap-3 h-full">
        {description?.length > 0 ? (
          <>
            <ul
              ref={contentRef}
              className={`text-sm font-normal text-[#7E859B] h-[250px] list-disc pl-5 ${
                isExpanded ? "overflow-auto" : "overflow-hidden"
              }`}
            >
              {description.map((d, index) => (
                <li key={index}>{d}</li>
              ))}
            </ul>

            {isOverflowing && (
              <button
                onClick={() => setIsExpanded((prev) => !prev)}
                className="text-profileLabel font-normal text-sm self-center transition-all duration-300 hover:underline"
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </>
        ) : (
          <p className="text-sm font-normal text-[#7E859B] h-[250px] overflow-hidden">
            No Description Yet.
          </p>
        )}
      </div>
    </div>
  );
};
export default Overview;
