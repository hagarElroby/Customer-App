import { svgs } from "../icons/svgs";

const PaymentMethods = () => {
  return (
    <div className="w-full rounded-lg p-5 flex flex-col gap-3 items-center justify-center border border-main">
      <p className="font-normal text-sm text-headColor">
        100% Guarantee Safe Checkout
      </p>
      <div className="flex gap-2 items-center">
        <span>{svgs.paypalIcon}</span>
        <span>{svgs.mastercardIcon}</span>
        <span>{svgs.visaIcon}</span>
        <span>{svgs.paypalIcon}</span>
        <span>{svgs.mastercardIcon}</span>
        <span>{svgs.visaIcon}</span>
      </div>
    </div>
  );
};
export default PaymentMethods;
