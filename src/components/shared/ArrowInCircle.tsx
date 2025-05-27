import React from "react";
import { svgs } from "../icons/svgs";

interface ArrowButtonProps {
  dir: "left" | "right";
}

const ArrowInCircle: React.FC<ArrowButtonProps> = ({ dir }) => {
  return (
    <div className="w-[46px] h-[46px] rounded-full bg-bgSearch shadow-bottom flex items-center justify-center">
      {dir === "right" ? (
        <span>{svgs.rightBlackArr}</span>
      ) : (
        <span>{svgs.leftBlackArr}</span>
      )}
    </div>
  );
};

export default ArrowInCircle;
