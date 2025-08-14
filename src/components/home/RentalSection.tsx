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
import { listRentals } from "@/services/rental";
import RentalCardInfo from "./RentalCardInfo";
import RentalCard from "../rental/RentalCard";

const RentalSection = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const {
    data,
    loading,
    refetch: refetchRentals,
  } = useFetchData({
    apiFunction: listRentals,
    params: {
      page: 1,
      limit: 8,
      allowPagination: true,
    },
  });

  const rentalsList = data?.docs || [];

  if (rentalsList.length === 0 && !loading) return;
  const handleClickRental = (id: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/rental?id=${id}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 w-full">
            <RentalCardInfo />
            <div className="flex-[1.6] flex gap-3 items-center">
              {rentalsList.slice(0, 3).map((rental) => (
                <RentalCard
                  key={rental._id}
                  id={rental._id}
                  image={rental.media.productCover}
                  title={rental.productName}
                  seller={rental.seller.companyName}
                  pricePerDay={rental.rentalDetails.pricePerDay}
                  handleClickItem={handleClickRental}
                  //   refetchRentals={refetchRentals ?? (() => {})}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 items-center">
            {rentalsList.slice(3, 8).map((rental) => (
              <RentalCard
                key={rental._id}
                id={rental._id}
                image={rental.media.productCover}
                title={rental.productName}
                seller={rental.seller.companyName}
                pricePerDay={rental.rentalDetails.pricePerDay}
                handleClickItem={handleClickRental}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RentalSection;
