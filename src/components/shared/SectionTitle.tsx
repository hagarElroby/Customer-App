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
      className={`flex items-center justify-between h-[70px] bg-white w-full py-[9px] px-[15px] rounded-lg ${className}`}
    >
      {/* Left section */}
      <div className="flex items-center gap-1">
        <div className="w-5 h-10 bg-main rounded"></div>
        <h3 className="text-homeHeaders font-bold text-2xl capitalize">
          {title}
        </h3>
        {resultValue && (
          <span
            className="flex items-center justify-center text-xs font-bold ml-2 text-main
                        min-w-24 h-10 rounded-[64px] bg-white p-4 border-[1px] border-main"
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
