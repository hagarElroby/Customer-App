import { useState } from "react";
import BidderInfo from "./BidderInfo";
import getTimeAgo from "@/utils/getTimeAgo";

interface Bid {
  _id: string;
  firstName: string;
  lastName: string;
  bidAmount: number;
  createdAt: string;
}

interface BidHistoryProps {
  bids: Bid[];
}

const BidHistory: React.FC<BidHistoryProps> = ({ bids }) => {
  const [showAll, setShowAll] = useState(false);

  const visibleBids = showAll ? bids : bids.slice(0, 5);

  return (
    <div className="w-full mt-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-[#1D1D1F]">
        <h3 className="text-[16px] font-semibold text-black">Bid history</h3>
        <span className="text-[13px] text-[#900A0A]">({bids.length} bid)</span>
      </div>

      <div
        className={`mt-2 flex flex-col gap-3 ${
          showAll ? "max-h-[300px] overflow-y-auto pr-1" : ""
        }`}
      >
        {visibleBids.map((bid) => (
          <BidderInfo
            key={bid._id}
            name={
              bid.firstName && bid.lastName
                ? `${bid.firstName} ${bid.lastName}`
                : `Bidder ${bid._id.slice(-4)}`
            }
            duration={getTimeAgo(bid.createdAt)}
            amount={bid.bidAmount}
          />
        ))}
      </div>

      {bids.length > 5 && (
        <div
          onClick={() => setShowAll((prev) => !prev)}
          className="mt-2 cursor-pointer text-sm font-medium text-[#900A0A]"
        >
          {showAll ? "See less bids ↑" : `See last bids (${bids.length - 5}) ↓`}
        </div>
      )}
    </div>
  );
};

export default BidHistory;
