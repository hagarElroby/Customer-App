"use client";
import { useRouter } from "next/navigation";
import React from "react";
import InfoCardWithBtn from "./InfoCardWithBtn";

const RentalCardInfo = () => {
  const router = useRouter();
  return (
    <InfoCardWithBtn
      title="Rent"
      desc="Looking for the latest and greatest in electronics? Look no
further than our Top 10 Bestsellers of the week! Our expertly
curated selection features the hottest gadgets and devices
flying off the shelves."
      onClick={() => router.push("/rentals")}
    />
  );
};

export default RentalCardInfo;
