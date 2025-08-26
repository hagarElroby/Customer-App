"use client";
import TopSectionAuction from "@/components/auction/TopSectionAuction";
import Overview from "@/components/productDetails/Overview";
import Specifications from "@/components/productDetails/Specifications";
import Loading from "@/components/shared/Loading";
import MainSection from "@/components/shared/MainSection";
import PreviouslyBrowsed from "@/components/shared/PreviouslyBrowsed";
import ProductSlider from "@/components/shared/ProductSlider";
import { getOneAuction } from "@/services/auction";
import { AuctionById } from "@/types/auction";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

const Page = () => {
  const searchParams = useSearchParams();
  const auctionId = searchParams.get("id");
  const [auctionData, setAuctionData] = useState<AuctionById | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  if (!auctionId) {
    return <div>No auction ID provided</div>;
  }

  const fetchAuctionData = useCallback(async () => {
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

  useEffect(() => {
    fetchAuctionData();
  }, [auctionId]);

  return (
    <MainSection>
      {loading && <Loading />}

      {!loading && auctionData && (
        <div className="flex flex-col gap-10 w-full p-9">
          <TopSectionAuction
            auction={auctionData}
            onSuccess={() => fetchAuctionData()}
          />
          <div className="flex flex-col md:flex-row items-center justify-center w-full gap-5">
            <Overview description={auctionData.productDescription} />
            <Specifications specifications={auctionData.productProperties} />
          </div>
        </div>
      )}

      <PreviouslyBrowsed />
      <ProductSlider title="You may also like" sortType="BEST_SELLER" />
    </MainSection>
  );
};

export default Page;
