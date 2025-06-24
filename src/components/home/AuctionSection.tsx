"use client";

import React from "react";
import LiveAuction from "./LiveAuction";
import AuctionCard from "../auction/AuctionCard";
import useFetchData from "@/hooks/useFetchData";
import { getAuctionList } from "@/services/auction";
import Loading from "../shared/Loading";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const AuctionSection = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data, loading, error } = useFetchData({
    apiFunction: getAuctionList,
    params: {
      page: 1,
      limit: 8,
      allowPagination: true,
    },
  });

  const auctionsList = data?.docs || [];

  if (auctionsList.length === 0 && !loading) return;

  const handleClickBid = (id: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/auction?id=${id}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            <LiveAuction />
            <div className="flex-[1.6] flex gap-3 items-center justify-between">
              {auctionsList.slice(0, 3).map((auction) => (
                <AuctionCard
                  key={auction._id}
                  id={auction._id}
                  image={auction.media.productCover}
                  title={auction.productName}
                  seller="STOCKMART"
                  currentBid={auction.auctionDetails.currentBid}
                  endDate={auction.auctionDetails.endDate}
                  onBid={handleClickBid}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 items-center justify-between">
            {auctionsList.slice(0, 3).map((auction) => (
              <AuctionCard
                key={auction._id}
                id={auction._id}
                image={auction.media.productCover}
                title={auction.productName}
                seller="STOCKMART"
                currentBid={auction.auctionDetails.currentBid}
                endDate={auction.auctionDetails.endDate}
                onBid={handleClickBid}
              />
            ))}
            {auctionsList.slice(0, 2).map((auction) => (
              <AuctionCard
                key={auction._id}
                id={auction._id}
                image={auction.media.productCover}
                title={auction.productName}
                seller="STOCKMART"
                currentBid={auction.auctionDetails.currentBid}
                endDate={auction.auctionDetails.endDate}
                onBid={handleClickBid}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuctionSection;
