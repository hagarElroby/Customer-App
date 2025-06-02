"use client";
import React, { useState } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="w-full relative">
      <div className="flex items-center justify-center relative">
        <label
          htmlFor={name}
          className="fontBack12 block text-borderAuth font-normal 
          leading-5 mb-1 absolute font-poppins left-4 hd:left-[0.7vw] top-0 
          transform -translate-y-1/2 px-1 bg-white z-[2]"
        >
          {label}
        </label>
        <input
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          className={`input-height custom-rounded-input input-padding custom-input-font16  w-full border hd:border-[0.06vw]
            ${error ? "border-main" : "border-borderAuth"} text-textAuth font-normal 
              focus:outline-none relative`}
        />
        {type === "password" && !error && (
          <div className="input-icon-mr absolute inset-y-0 flex items-center">
            <i
              className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"} text-borderAuth cursor-pointer text-base hd:text-[1.11vw]`}
              onClick={handlePasswordToggle}
            ></i>
          </div>
        )}
        {error && (
          <span className="input-icon-mr input-icon-size block absolute top-1/2 transform -translate-y-1/2  cursor-pointer">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.4967 13.2L10.2767 2.23999C10.1276 1.97803 9.91184 1.76022 9.65129 1.60871C9.39075 1.4572 9.09473 1.37738 8.79334 1.37738C8.49194 1.37738 8.19592 1.4572 7.93538 1.60871C7.67483 1.76022 7.45906 1.97803 7.31 2.23999L1.08334 13.2C0.936483 13.4597 0.860287 13.7534 0.862345 14.0518C0.864404 14.3501 0.944646 14.6427 1.09507 14.9004C1.24549 15.1581 1.46084 15.3718 1.71964 15.5203C1.97843 15.6688 2.27164 15.7468 2.57 15.7467H15.01C15.3084 15.7468 15.6016 15.6688 15.8604 15.5203C16.1192 15.3718 16.3345 15.1581 16.4849 14.9004C16.6354 14.6427 16.7156 14.3501 16.7177 14.0518C16.7197 13.7534 16.6435 13.4597 16.4967 13.2Z"
                fill="#700C18"
              />
              <path
                d="M9.56337 13.2733C9.38156 13.4397 9.1431 13.5303 8.89671 13.5267C8.65167 13.5295 8.41423 13.4416 8.23004 13.28C8.13238 13.1923 8.05542 13.084 8.00469 12.963C7.95396 12.8419 7.93074 12.7111 7.93671 12.58C7.93581 12.4549 7.9599 12.3308 8.00758 12.2151C8.05525 12.0994 8.12554 11.9944 8.21434 11.9062C8.30313 11.8181 8.40864 11.7485 8.52467 11.7016C8.6407 11.6548 8.76492 11.6316 8.89004 11.6333C9.01368 11.6328 9.1362 11.6567 9.2506 11.7036C9.365 11.7505 9.46902 11.8195 9.55671 11.9067C9.64662 11.9926 9.71787 12.0962 9.76604 12.2109C9.81421 12.3256 9.83827 12.4489 9.83671 12.5733C9.84473 12.7029 9.82443 12.8326 9.77723 12.9535C9.73002 13.0744 9.65705 13.1835 9.56337 13.2733Z"
                fill="white"
              />
              <path
                d="M9.81676 6.92665L9.5701 9.71999C9.56576 9.98703 9.51383 10.2512 9.41676 10.5C9.37176 10.599 9.29823 10.6823 9.2056 10.7394C9.11297 10.7964 9.00544 10.8244 8.89676 10.82C8.78961 10.8255 8.6833 10.7985 8.59172 10.7426C8.50014 10.6867 8.42755 10.6045 8.38343 10.5067C8.28051 10.2445 8.21976 9.96778 8.20343 9.68665L8.02343 6.96665C7.9901 6.42665 7.9701 6.05332 7.9701 5.81999C7.95462 5.52805 8.05255 5.24142 8.24343 5.01999C8.33584 4.92291 8.44781 4.84657 8.57193 4.796C8.69605 4.74543 8.82949 4.72179 8.96343 4.72665C9.11382 4.71884 9.26305 4.75667 9.39154 4.8352C9.52004 4.91372 9.62179 5.02926 9.68343 5.16665C9.81518 5.48753 9.87437 5.83356 9.85676 6.17999C9.8558 6.42939 9.84245 6.67858 9.81676 6.92665Z"
                fill="white"
              />
            </svg>
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
