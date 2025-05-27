interface InfoProps {
  icon: React.ReactNode;
  text: string;
  time?: string;
  isWhite?: boolean;
}
const Info: React.FC<InfoProps> = ({ icon, text, time, isWhite }) => {
  return (
    <div
      className={`w-full h-10 py-2 px-3 flex items-center justify-between
    ${isWhite ? "bg-white " : "bg-lightMain1 "}
    ${time && "shadow-bottom my-4"}
    `}
    >
      <div className="flex items-center gap-3">
        <span>{icon}</span>
        <span
          className={`text-xs font-bold capitalize ${isWhite ? "text-[#404553]" : "text-[#777777]"}`}
        >
          {text}
        </span>
      </div>
      {time && (
        <span className="h-6 py-1 px-5 bg-main text-xs font-bold text-white rounded-[59px]">
          {time}
        </span>
      )}
    </div>
  );
};
export default Info;
