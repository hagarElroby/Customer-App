import React from "react";
import { svgs } from "../icons/svgs";

const GoToTheAppSection = () => {
  return (
    <div className="flex md:hidden w-full relative h-14 dot-bg items-center justify-between p-[14px]">
      <div className="flex items-center gap-4">
        <span>{svgs.xVectorBold}</span>
        <span>{svgs.sqaureLogo}</span>
        <p className="text-xs font-bold text-white">
          Shop easier with Dazzliy App
        </p>
      </div>
      <button
        //TODO: Add onClick handler to navigate to the app link on store
        onClick={() => ""}
        className="h-[29px] py-2 px-3 border border-white rounded-[20px] flex items-center justify-center text-xs font-bold text-white"
      >
        Go to the App
      </button>
    </div>
  );
};

export default GoToTheAppSection;
