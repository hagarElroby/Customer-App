"use client";
import Overview from "@/components/productDetails/Overview";
import Specifications from "@/components/productDetails/Specifications";
import TopSectionRental from "@/components/rental/TopSectionRental";
import Loading from "@/components/shared/Loading";
import MainSection from "@/components/shared/MainSection";
import PreviouslyBrowsed from "@/components/shared/PreviouslyBrowsed";
import ProductSlider from "@/components/shared/ProductSlider";
import { getOneRental } from "@/services/rental";
import { RentalById } from "@/types/rentals";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const rentalId = searchParams.get("id");
  const [rentalData, setRentalData] = useState<RentalById | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!rentalId) {
    return <div>No rental ID provided</div>;
  }
  useEffect(() => {
    setLoading(true);
    getOneRental({
      rentalId,
      onSuccess: (data) => {
        setRentalData(data[0]);
        setLoading(false);
      },
      onError: (err) => {
        toast.error(err.description || "Failed to fetch rental data");
        setLoading(false);
      },
    });
  }, [rentalId]);
  return (
    <MainSection>
      {loading && <Loading />}

      {!loading && rentalData?.rentalDetails && (
        <div className="flex flex-col gap-10 w-full p-9">
          <TopSectionRental rental={rentalData} />
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
            <Overview description={rentalData.productDescription} />
            <Specifications specifications={rentalData.productProperties} />
          </div>
        </div>
      )}

      <PreviouslyBrowsed />
      <ProductSlider title="You may also like" sortType="BEST_SELLER" />
    </MainSection>
  );
};

export default Page;
