interface PropertyTagProps {
  value: string;
  isSelected: boolean;
  disabled: boolean;
  onClick: () => void;
}

const PropertyTag: React.FC<PropertyTagProps> = ({
  value,
  isSelected,
  disabled,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`h-10 rounded-[63px] py-2 px-4 transition-colors 
        ${isSelected ? "bg-lightMain1 text-main" : "bg-lightBlue1 text-black"}`}
    >
      {value}
    </button>
  );
};
export default PropertyTag;
