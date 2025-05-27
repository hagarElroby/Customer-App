import { svgs } from "../icons/svgs";

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  width?: string;
}
const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onIncrease,
  onDecrease,
  width,
}) => {
  return (
    <div
      style={{ width: width }}
      className="w-[187px] h-11 rounded-[55px] py-4 px-2 flex items-center justify-between border-[2px] border-homeBorderCard"
    >
      <button disabled={quantity == 1} onClick={onDecrease}>
        {svgs.decrease}
      </button>
      <span>{String(quantity).padStart(2, "0")}</span>

      <button onClick={onIncrease}>{svgs.increase}</button>
    </div>
  );
};

export default QuantitySelector;
