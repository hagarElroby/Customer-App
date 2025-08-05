"use client";

interface RentalCardProps {
  id: string;
  image: string;
  title: string;
  seller?: string;
  pricePerDay: number;
  handleClickItem: (id: string) => void;
  refetchAuctions?: () => void;
}

const RentalCard: React.FC<RentalCardProps> = ({
  id,
  image,
  title,
  seller,
  handleClickItem,
  pricePerDay,
}) => {
  return (
    <div
      onClick={() => handleClickItem(id)}
      className="cursor-pointer rounded-xl bg-white p-3 flex flex-col gap-2 relative w-[262px] h-[453px]"
    >
      {/* Product Image */}
      <div className="w-full h-[285px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Product Info */}
      <div className="h-28 overflow-hidden">
        <span className="text-[10px] text-[#717171] font-bold uppercase line-clamp-1">
          {seller}
        </span>
        <div className="h-[70px]">
          <h3 className="text-[15px] font-bold text-[#040404] line-clamp-3">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-1 overflow-clip h-6">
          <span className="text-[#2D8653] font-bold text-base">
            IQD{pricePerDay}
          </span>
          <span className="text-xs text-[#717171] font-bold uppercase">
            / Day
          </span>
        </div>
      </div>
    </div>
  );
};

export default RentalCard;
