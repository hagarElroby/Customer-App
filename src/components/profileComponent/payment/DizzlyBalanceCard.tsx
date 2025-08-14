import HrLine from "@/components/shared/HrLine";
import React from "react";

interface DizzlyBalanceCardProps {
  balance: number;
  available: number;
}

// const formatCurrency = (amount: number) =>
//   `IQD${amount.toLocaleString("en-US")}`;

const DizzlyBalanceCard: React.FC<DizzlyBalanceCardProps> = ({
  balance,
  available,
}) => {
  return (
    <div className="flex min-h-[132px] items-center justify-between gap-3 rounded-md bg-white px-10 py-3">
      <div className="flex flex-[1] flex-col gap-3">
        <h3 className="text-base font-bold text-[#404553]">Dizzly Balance</h3>
        <p className="text-sm text-[#404553]">
          This is the amount you can use to make purchases, participate in
          auctions.
        </p>
      </div>

      <div className="flex flex-[1] flex-col gap-2">
        <div className="flex items-center justify-between">
          <div className="text-gray-500 text-xs">Balance</div>
          <div className="w-full text-right text-sm text-[#484848]">
            IQD {balance}
          </div>
        </div>
        <HrLine />
        <div className="flex items-center justify-between">
          <div className="text-base font-bold text-[#111111]">Available</div>
          <div className="flex items-start text-[28px] font-bold text-[#111111]">
            <span className="text-sm">IQD</span>
            <span>{available}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DizzlyBalanceCard;
