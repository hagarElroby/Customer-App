import { SectionTitleProps } from "@/types/global";
const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  resultValue,
  children,
  className,
  height,
}) => {
  return (
    <div
      style={{ height: height }}
      className={`flex items-center justify-between h-[45px] lg:h-[70px] bg-white w-full py-[9px] px-[15px] rounded-lg ${className}`}
    >
      {/* Left section */}
      <div className="flex items-center gap-1">
        <div className="w-[6px] h-5 lg:w-5 lg:h-10 bg-main rounded"></div>
        <h3 className="text-homeHeaders font-bold text-sm lg:text-2xl capitalize">
          {title}
        </h3>
        {resultValue && (
          <span
            className="flex items-center justify-center text-[10px] sm:text-xs md:font-bold ml-2 text-main
                      w-20 overflow-hidden  md:min-w-24 md:h-10 rounded-[64px] bg-white p-1 md:p-4 border-[1px] border-main"
          >
            {resultValue} results
          </span>
        )}
      </div>

      {/* Right-aligned children */}
      <div className="flex items-center gap-5">{children}</div>
    </div>
  );
};

export default SectionTitle;
