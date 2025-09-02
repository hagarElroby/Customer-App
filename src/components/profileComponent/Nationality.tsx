import React, { useRef, useState } from "react";
import countries from "../../../countries.json";
import useClickOutside from "@/hooks/useClickOutside";
import { svgs } from "../icons/svgs";

interface NationalityDropdownProps {
  value: string;
  onChange: (value: string) => void;
}

const NationalityDropdown: React.FC<NationalityDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropMenuRef = useRef<HTMLDivElement>(null);
  useClickOutside(dropMenuRef, () => setIsDropdownOpen(false));

  const handleSelect = (item: { name: string }) => {
    onChange(item.name);
    setIsDropdownOpen(false);
  };

  return (
    <div className="mb-4 relative w-full">
      <div
        ref={dropMenuRef}
        className="flex items-center justify-between relative gap-[2px] md:gap-1 py-2 px-2 h-12
        rounded border border-whiteBorder bg-white min-w-[200px] w-full mb-1"
      >
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Select your nationality"
          className="w-full ml-1 placeholder-weakColor text-black outline-none bg-transparent
          font-normal text-[10px] lg:text-xs xxl:text-sm hd:text-[0.97vw]"
        />
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center justify-center"
        >
          <span
            className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
          >
            {svgs.smallRedArr}
          </span>
        </button>
      </div>
      {isDropdownOpen && (
        <div
          className="absolute top-full left-0 z-10 min-w-[200px] w-full h-40 overflow-y-auto 
          overflow-x-hidden bg-white border border-lightBorder rounded-lg
          flex flex-col items-start custom-scrollbar"
        >
          {countries.length > 0 ? (
            countries.map((item) => (
              <div
                key={item.name}
                onClick={() => handleSelect(item)}
                className="w-full font-normal text-[8px] sm:text-[10px] md:text-xs rounded-sm
                xxl:text-sm hd:text-[0.97vw] text-blackTitle flex items-center px-4 py-2
                hover:bg-weakRed hover:border-lightBorder
                transition-all duration-300 ease-in-out cursor-pointer"
              >
                <span>{item.name}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-5">No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NationalityDropdown;
