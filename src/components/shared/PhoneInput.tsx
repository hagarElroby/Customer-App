"use client";
import { countryData } from "./countryData";
import { useState } from "react";

interface InputProps {
  name?: string;
  value?: string;
  placeholder: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  handleDropdownChange?: (value: string) => void;
  isAuthField?: boolean;
  error?: string;
  label?: string;
}

const PhoneInput: React.FC<InputProps> = ({
  name,
  value,
  placeholder,
  onChange,
  disabled,
  handleDropdownChange,
  isAuthField,
  error,
  label,
}) => {
  const [selectedCountry, setSelectedCountry] = useState(countryData.data[0]);
  const [dropDown, setDropDown] = useState(false);
  const [inputValue, setInputValue] = useState(countryData.data[0].key || "");

  const handleSelect = (country: any) => {
    setSelectedCountry(country);
    setDropDown(false);
    const updatedValue = `${country.key}${inputValue.replace(/^\+\d+/, "")}`;
    setInputValue(updatedValue);

    if (handleDropdownChange) {
      handleDropdownChange(country.key);
    }
  };

  const toggleDropdown = () => {
    setDropDown((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const userInput = e.target.value;

    if (!userInput.startsWith(selectedCountry.key)) {
      setInputValue(selectedCountry.key + userInput.replace(/\D/g, ""));
      return;
    }

    const digitsAfterCode = userInput
      .slice(selectedCountry.key.length)
      .replace(/\D/g, "");

    const trimmedDigits = digitsAfterCode.slice(0, 10);

    const updatedValue = selectedCountry.key + trimmedDigits;
    setInputValue(updatedValue);

    if (onChange) {
      onChange({
        ...e,
        target: {
          ...e.target,
          value: updatedValue,
        },
      });
    }
  };

  const restrictInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const key = e.key;

    // Prevent non-digit characters
    if (!/\d|Backspace|Delete|Tab|ArrowLeft|ArrowRight/.test(key)) {
      e.preventDefault();
    }

    // Prevent deleting the country code
    const input = e.target as HTMLInputElement;
    if (
      input.selectionStart !== null &&
      input.selectionStart <= selectedCountry.key.length &&
      (key === "Backspace" || key === "Delete")
    ) {
      e.preventDefault();
    }
  };

  return (
    <div id="phone-input-container" className="w-full relative">
      <div
        id="phone-number"
        className="flex items-center justify-center relative"
      >
        {isAuthField && (
          <label
            htmlFor={name}
            className="fontBack12 block text-borderAuth font-normal 
            leading-5 mb-1 absolute font-poppins left-4 hd:left-[0.7vw] top-0 
            transform -translate-y-1/2 px-1 bg-white z-[2]"
          >
            {label || "Phone Number"}
          </label>
        )}
        <div
          className={`flex items-center w-full border hd:border-[0.06vw] 
          ${error ? "border-main custom-rounded-input input-height " : isAuthField ? "border-borderAuth input-height  custom-rounded-input" : "border-customBorder rounded-[5px] overflow-hidden"} 
           relative`}
        >
          <div
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-2 cursor-pointer h-full w-10"
          >
            <img
              src={selectedCountry.image}
              alt={selectedCountry.name}
              className="w-full h-4 rounded-sm object-cover"
            />
            <span
              className={`transform transition-transform duration-300 ${
                dropDown ? "rotate-180" : ""
              }`}
            >
              <svg
                width="13"
                height="9"
                viewBox="0 0 13 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.4999 5.6714L11.4497 0.72168L12.8639 2.13589L6.4999 8.4999L0.135986 2.13589L1.5502 0.72168L6.4999 5.6714Z"
                  fill="#0B0B0B"
                />
              </svg>
            </span>
          </div>

          <input
            type="text"
            id={name}
            name={name}
            value={inputValue}
            placeholder={placeholder}
            onChange={handleInputChange}
            disabled={disabled}
            onKeyDown={restrictInput}
            className={` ${
              isAuthField
                ? "ml-2 custom-input-font16 w-full h-full focus:outline-none text-textAuth font-normal input-padding bg-transparent"
                : "ml-2 min-w-[190px] w-full py-3 px-4 rounded-[5px] text-[10px] font-medium placeholder-inputMediumGray text-black outline-none"
            }`}
          />

          {error && (
            <img
              src="/images/errorIcon.svg"
              alt="error icon"
              className="input-icon-mr input-icon-size block absolute top-1/2 
              transform -translate-y-1/2 right-0 cursor-pointer"
            />
          )}
        </div>
      </div>

      {dropDown && (
        <div
          className="absolute w-full mt-2 bg-white border border-lightBorder 
        rounded-lg max-h-[200px] overflow-y-auto z-20"
        >
          {countryData.data.map((country: any) => (
            <div
              key={country.id}
              id={`country-option-${country.id}`}
              onClick={() => handleSelect(country)}
              className={`flex items-center gap-3 px-4 py-2 cursor-pointer ${
                selectedCountry.id === country.id
                  ? "bg-weakRed"
                  : "hover:bg-gray-100"
              }`}
            >
              <img
                src={country.image}
                alt={country.name}
                className="w-6 h-4 rounded-sm object-cover"
              />
              <span className="text-sm font-medium">{country.name}</span>
              <span className="text-sm font-medium">{country.key}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PhoneInput;
