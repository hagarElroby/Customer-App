import { svgs } from "../icons/svgs";
import Info from "./Info";

const StoreInfo = () => {
  return (
    <div>
      <Info icon={svgs.clock} text="Partner Since" time="1 month" isWhite />
      <Info icon={svgs.delivery} text="Free Delivery" />
      <Info icon={svgs.secure} text="Secure Delivery " isWhite />
      <Info icon={svgs.cash} text="Cash on delivery" />
      <Info icon={svgs.time} text="14 days Replacement" isWhite />
      <Info icon={svgs.transaction} text="Secure transaction" />
    </div>
  );
};
export default StoreInfo;
