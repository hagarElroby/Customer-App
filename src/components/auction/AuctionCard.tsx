"use client";
import { Button, Tag } from "antd";
import { useCountdown } from "@/hooks/useCountDown";
import { useEffect, useRef } from "react";

interface AuctionCardProps {
  id: string;
  image: string;
  title: string;
  seller?: string;
  currentBid: number;
  isLive?: boolean;
  endDate: string;
  onBid: (id: string) => void;
  refetchAuctions?: () => void;
}

const AuctionCard: React.FC<AuctionCardProps> = ({
  id,
  image,
  title,
  seller,
  currentBid,
  endDate,
  onBid,
  refetchAuctions,
}) => {
  const timeLeft = useCountdown(endDate);

  useEffect(() => {
    if (timeLeft === "0 seconds") {
      refetchAuctions?.();
    }
  }, [timeLeft, refetchAuctions]);

  return (
    <div
      onClick={() => onBid(id)}
      className="cursor-pointer rounded-xl bg-white p-3 flex flex-col gap-2 relative w-[262px] h-[455px] overflow-hidden"
    >
      {/* Status Tags */}
      <div className="pt-2 pr-2 flex gap-2 z-10">
        <Tag color="#2D8653" className="!m-0">
          <span className="font-[Public-Sans] text-[13px] font-bold capitalize leading-[20px] tracking-[0%] text-white">
            Live
          </span>
        </Tag>

        <Tag color="#700C18" className="!m-0">
          <span className="font-[Public-Sans] text-[13px] font-bold leading-[20px] tracking-[0%] text-white">
            {timeLeft}
          </span>
        </Tag>
      </div>

      {/* Product Image */}
      <div className="w-full h-[285px] overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-contain" />
      </div>

      {/* Place A Bid Button */}
      <Button
        type="primary"
        style={{
          backgroundColor: "#700c18",
          borderRadius: 4,
          padding: "10px 14px",
          height: 40,
          fontWeight: 700,
          fontSize: "14px",
        }}
        block
      >
        Place A Bid
      </Button>

      {/* Product Info */}
      <div>
        <span className="text-[10px] text-[#717171] font-bold uppercase line-clamp-1">
          {seller}
        </span>
        <div className="h-11">
          <h3 className="text-[15px] font-bold text-[#040404] line-clamp-2">
            {title}
          </h3>
        </div>
        <div className="h-12 line-clamp-2">
          <span className="text-[13px] text-[#717171] font-bold">
            Current bid:{" "}
          </span>
          <span className="text-main font-bold text-base">
            IQD {currentBid ?? 0}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
