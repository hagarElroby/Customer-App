interface BidderInfoProps {
  name: string;
  duration: string;
  amount: string;
}

const BidderInfo: React.FC<BidderInfoProps> = ({ name, duration, amount }) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex w-full items-center justify-between gap-4">
        <span className="text-xs font-medium text-[#565B60]">{name}</span>
        <span className="text-xs font-medium text-[#919397]">{duration}</span>
      </div>
      <div className="flex w-full  justify-end">
        <span className="text-[13px] font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default BidderInfo;
