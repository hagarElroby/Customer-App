import React from "react";
import { svgs } from "../icons/svgs";

type CustomProps = {
  onClose: () => void;
  title: string;
  isPadding16?: boolean;
  isInCenter?: boolean;
};

const CustomHeaderInModal = ({
  onClose,
  title,
  isInCenter,
  isPadding16,
}: CustomProps) => {
  return (
    <div
      className={`relative flex items-center ${
        isInCenter ? "justify-end" : "justify-between"
      } ${isPadding16 ? "py-6 px-10" : "p-3"}`}
    >
      {isInCenter && (
        <h2 className="absolute left-1/2 transform -translate-x-1/2 text-base font-bold text-main">
          {title}
        </h2>
      )}
      {!isInCenter && (
        <h2 className="text-base font-bold text-main">{title}</h2>
      )}
      <button onClick={onClose}>{svgs.redX}</button>
    </div>
  );
};

export default CustomHeaderInModal;
