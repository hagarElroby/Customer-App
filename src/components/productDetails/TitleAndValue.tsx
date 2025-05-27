import React from "react";

interface TitleAndValueProps {
  title: string;
  value: string;
  isGreen?: boolean;
  isGray?: boolean;
  isRed?: boolean;
}

const TitleAndValue: React.FC<TitleAndValueProps> = ({
  title,
  value,
  isGreen,
  isGray,
  isRed,
}) => {
  return (
    <div className="flex items-center gap-1">
      <span className="font-normal text-sm text-gray3">{title}:</span>
      <span
        className={`
          ${isGreen ? "text-green1" : isGray ? "text-[#7E859B] font-semibold text-sm " : isRed ? "text-main font-bold text-lg" : "text-blackTitle font-semibold text-sm "}
`}
      >
        {value}
      </span>
    </div>
  );
};

export default TitleAndValue;
