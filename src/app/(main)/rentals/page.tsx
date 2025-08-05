"use client";
import AuctionCard from "@/components/auction/AuctionCard";
import BannerSlider from "@/components/banner/BannerSlider";
import RentalCard from "@/components/rental/RentalCard";
import Loading from "@/components/shared/Loading";
import NavigationBar from "@/components/shared/NavigationBar";
import PaginationButtons from "@/components/shared/PaginationButtons";
import { RootState } from "@/redux/store";
import { getAuctionList } from "@/services/auction";
import { listRentals } from "@/services/rental";
import { AuctionListObject } from "@/types/auction";
import { RentalListObject } from "@/types/rentals";
import { cleanParams } from "@/utils/filterUndefined";
import { usePagination } from "@/utils/paginationUtils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const limit = 15;
const AuctionsPage = () => {
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);

  const [rentals, setRentals] = useState<RentalListObject[]>([]);
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
    const fetchRentals = async () => {
      const params = cleanParams({
        subCategory: subCatId,
        page: currentPage,
        limit,
        allowPagination: true,
      });
      await listRentals({
        ...params,
        onSuccess: (data) => {
          setRentals(data.docs);
          setTotalPages(data.totalPages ?? 1);
          setTotalDocs(data.totalDocs ?? 1);
          setLoading(false);
        },
        onError: (err) => {
          setLoading(false);
        },
      });
    };
    fetchRentals();
  }, [currentPage, subCatId]);

  if (rentals.length === 0 && !loading) return;

  const handleClickRental = (id: string) => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    router.push(`/rental?id=${id}`);
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

        {!loading && !!rentals.length && (
          <>
            <div className="flex flex-wrap gap-3 items-center justify-center">
              {rentals.map((rental) => (
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
