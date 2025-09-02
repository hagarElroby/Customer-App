"use client";
import AuctionCard from "@/components/auction/AuctionCard";
import BannerSlider from "@/components/banner/BannerSlider";
import { svgs } from "@/components/icons/svgs";
import Loading from "@/components/shared/Loading";
import NavigationBar from "@/components/shared/NavigationBar";
import PaginationButtons from "@/components/shared/PaginationButtons";
import RoundedBtnWithIcon from "@/components/shared/RoundedBtnWithIcon";
import SectionTitle from "@/components/shared/SectionTitle";
import useFetchData from "@/hooks/useFetchData";
import { RootState } from "@/redux/store";
import { getAuctionList } from "@/services/auction";
import { AuctionListObject } from "@/types/auction";
import { cleanParams } from "@/utils/filterUndefined";
import { usePagination } from "@/utils/paginationUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const limit = 15;
const AuctionsPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [auctions, setAuctions] = useState<AuctionListObject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalDocs, setTotalDocs] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [subCatId, setSubCatId] = useState<string>("");

  const { handleNext, handlePrev, handlePageClick } = usePagination(
    currentPage,
    totalPages,
    setCurrentPage,
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleMessage = async (event: MessageEvent) => {
        console.log("from handler", event.data);
        if (event.data?.messageType === "push-received") {
          console.log(event.data.data.eventName);
          if (event.data.data.eventName === "new_bid_placed")
            await getAuctionList({
              page: currentPage,
              limit,
              allowPagination: true,
              onSuccess: (data) => {
                setAuctions(data.docs);
                setTotalPages(data.totalPages ?? 1);
                setTotalDocs(data.totalDocs ?? 1);
                setLoading(false);
              },
              onError: (err) => {
                setLoading(false);
              },
            });
          console.log("from auction comp", event.data.data);
        }
      };

      navigator.serviceWorker.addEventListener("message", handleMessage);

      return () => {
        navigator.serviceWorker.removeEventListener("message", handleMessage);
      };
    }
  }, []);

  useEffect(() => {
    const fetchAuctions = async () => {
      const params = cleanParams({
        page: currentPage,
        limit,
        allowPagination: true,
      });
      await getAuctionList({
        ...params,
        onSuccess: (data) => {
          setAuctions(data.docs);
          setTotalPages(data.totalPages ?? 1);
          setTotalDocs(data.totalDocs ?? 1);
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
        },
      });
    };
    fetchAuctions();
  }, [currentPage, subCatId]);

  if (auctions.length === 0 && !loading) return;

  const handleClickBid = (id: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/auction?id=${id}`);
  };

  return (
    <main className=" pb-28 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      <NavigationBar />
      <div className="flex flex-col gap-10 px-8">
        <BannerSlider />

        <div>
          {/* <SectionTitle title="best selling">
            <RoundedBtnWithIcon
              icon={svgs.redArrowIcon}
              text="Sort"
              onClick={() => {
                setSortPopup(true);
              }}
            />
            <RoundedBtnWithIcon
              icon={svgs.filterIcon}
              text="All filters"
              onClick={() => setFilterPopup(true)}
            />
          </SectionTitle> */}
        </div>

        {loading && <Loading />}

        {!loading && !!auctions.length && (
          <>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {auctions.map((auction) => (
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
            <div className="bg-white sticky bottom-0 z-10">
              <PaginationButtons
                limit={limit}
                totalDocs={totalDocs}
                currentPage={currentPage || 1}
                totalPages={totalPages}
                onNext={handleNext}
                onPrev={handlePrev}
                onPageClick={handlePageClick}
              />
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default AuctionsPage;
