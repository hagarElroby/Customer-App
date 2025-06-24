"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React from "react";

const LiveAuction = () => {
  const router = useRouter();
  return (
    <div className="flex-[1] flex flex-col gap-12 items-start w-[536px] h-[453px] bg-white rounded-md pt-[84px] px-12">
      <span className="uppercase text-[10px] font-bold text-[#717171] leading-3">
        Today’s
      </span>
      <h2 className="text-[40px] font-bold text-[#040404] leading-[44px]">
        Live Auction
      </h2>
      <p className="text-base text-[#717171 ] leading-5">
        Looking for the latest and greatest in electronics? Look no further than
        our Top 10 Bestsellers of the week! Our expertly curated selection
        features the hottest gadgets and devices flying off the shelves.
      </p>
      <Button
        type="primary"
        style={{
          backgroundColor: "#760813",
          borderColor: "#700c18",
          borderRadius: 4,
          height: 40,
          padding: "16px 32px",
          fontWeight: 700,
          fontSize: "13px",
        }}
        onClick={() => router.push("/auctions")}
      >
        See More
      </Button>
    </div>
  );
};

export default LiveAuction;
