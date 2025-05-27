interface CheckboxFieldProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: any) => void;
  error?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  name,
  checked,
  onChange,
  error,
}) => {
  return (
    // <div className="relative">
    //   <div className="flex items-center space-x-1 hd:space-x-[0.27vw]">
    //     <input
    //       type="checkbox"
    //       name={name}
    //       id={name}
    //       checked={checked}
    //       onChange={onChange}
    //       className="w-3 h-3 md:w-4 md:h-4 lg:w-[1.52vw] lg:h-[2.44vh] rounded"
    //     />
    //     <label
    //       htmlFor={name}
    //       className="text-meduimBlack font-normal custom-font12"
    //     >
    //       {label}
    //     </label>
    //   </div>
    // </div>
    <label className="flex items-center gap-2 hd:gap-[0.5vw] cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`w-5 h-5 hd:w-[1.38vw] hd:h-[1.38vw] flex items-center justify-center border-[2px] border-main rounded bg-main ${
          checked ? "" : "bg-white"
        }`}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="3"
            stroke="white"
            className="w-3 h-3 hd:w-[0.83vw] hd:h-[0.83vw]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span
        className={` font-normal custom-font12 ${checked ? "text-main" : "text-meduimBlack"}`}
      >
        {label}
      </span>
    </label>
  );
};

export default CheckboxField;
