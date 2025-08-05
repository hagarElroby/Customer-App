"use client";
import { useRouter } from "next/navigation";
import React from "react";
import InfoCardWithBtn from "./InfoCardWithBtn";

const LiveAuction = () => {
  const router = useRouter();
  return (
    <InfoCardWithBtn
      title="Live Auction"
      desc="Looking for the latest and greatest in electronics? Look no further than
        our Top 10 Bestsellers of the week! Our expertly curated selection
        features the hottest gadgets and devices flying off the shelves."
      onClick={() => router.push("/auctions")}
    />
  );
};

export default LiveAuction;
