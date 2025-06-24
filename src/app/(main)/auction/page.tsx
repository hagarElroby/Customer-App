"use client";
import TopSectionAuction from "@/components/auction/TopSectionAuction";
import Overview from "@/components/productDetails/Overview";
import Specifications from "@/components/productDetails/Specifications";
import TopSection from "@/components/productDetails/TopSection";
import Loading from "@/components/shared/Loading";
import PreviouslyBrowsed from "@/components/shared/PreviouslyBrowsed";
import ProductSlider from "@/components/shared/ProductSlider";
import useFetchData from "@/hooks/useFetchData";
import { getOneAuction } from "@/services/auction";
import { AuctionById } from "@/types/auction";
import { set } from "lodash";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const page = () => {
  const searchParams = useSearchParams();
  const auctionId = searchParams.get("id");
  const [auctionData, setAuctionData] = useState<AuctionById | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!auctionId) {
    return <div>No auction ID provided</div>;
  }
  useEffect(() => {
    setLoading(true);
    getOneAuction({
      auctionId,
      onSuccess: (data: AuctionById) => {
        setAuctionData(data);
        setLoading(false);
      },
      onError: (err) => {
        toast.error(err.description || "Failed to fetch auction data");
        setLoading(false);
      },
    });
  }, [auctionId]);

  console.log({ auctionData });
  return (
    <div className="bg-bgPanel">
      {loading && <Loading />}

      {!loading && auctionData && (
        <div className="flex flex-col gap-10 w-full p-9">
          <TopSectionAuction auction={auctionData} />
          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-5">
            <Overview description={auctionData.productDescription} />
            <Specifications specifications={auctionData.productProperties} />
          </div>
        </div>
      )}

      <PreviouslyBrowsed />
      <ProductSlider title="You may also like" sortType="BEST_SELLER" />
    </div>
  );
};

export default page;
