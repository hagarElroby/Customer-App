"use client";
import ImageGallery from "../productDetails/ImageGallery";
import TitleAndValue from "../productDetails/TitleAndValue";
import HrLine from "../shared/HrLine";
import PaymentMethods from "../productDetails/PaymentMethods";
import StoreInfo from "../productDetails/StoreInfo";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { AuctionById } from "@/types/auction";
import { svgs } from "../icons/svgs";
import { Rate } from "antd";
import BidderInfo from "./BidderInfo";
interface TopSectionProps {
  auction: AuctionById;
}

const TopSectionAuction: React.FC<TopSectionProps> = ({ auction }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);

  return (
    <div className="flex items-start justify-between flex-col custom:flex-row flex-wrap gap-3 px-3 py-5 h-[686px] overflow-auto">
      {/* left section  */}
      <div
        className="flex-[1] min-w-[250px] max-w-[600px] mx-auto flex flex-col items-center justify-center 
      gap-4 bg-white rounded-3xl p-4 overflow-y-auto overflow-x-hidden h-full"
      >
        {auction && auction.media && (
          <ImageGallery
            minimumBid={auction?.auctionDetails?.minimumBidPerTime}
            images={[
              { url: auction?.media.productCover, type: "img" },
              ...(auction?.media.productImages?.map((img) => ({
                url: img,
                type: "img",
              })) || []),
              {
                url: auction?.media?.productVideo,
                type: "video",
              },
            ]}
          />
        )}
      </div>
      {/* right section  */}
      <div className="flex flex-col justify-between items-start gap-3 flex-[1.4] min-w-[250px] max-w-[1000px] h-full  rounded-3xl overflow-y-auto overflow-x-hidden bg-white mx-auto">
        {/* top  */}
        <div
          className="flex flex-col custom:flex-row items-start justify-between
          gap-3 p-4"
        >
          {/* left  */}
          <div className="flex-[1] min-w-[230px] max-w-[420px] bg-white p-6 h-full flex flex-col gap-4">
            <p className="font-normal text-xl text-blackTitle">
              {auction.productName}
            </p>
            <div className="flex items-center gap-6">
              <TitleAndValue
                title="Category"
                value={auction?.subCategory?.category?.name}
              />
              <TitleAndValue title="Sku" value="A264671" />
            </div>
            <div className="flex items-center gap-6">
              <TitleAndValue title="Brand" value="Apple" />
              <TitleAndValue
                title="Subcategory"
                value={auction?.subCategory?.name}
              />
            </div>

            <div className="bg-[#F6F6F8] flex my-2 w-full justify-between gap-3 px-5 py-2">
              <div className="flex flex-col items-start gap-[5px]">
                <span className="text-sm text-[#0E0E10]">current bid:</span>
                <span className="text-sm font-semibold text-[#097D47]">
                  00.0 {auction?.auctionDetails?.currentBid} IQD
                </span>
              </div>
              <div className="flex flex-col items-start gap-[5px]">
                <span className="text-sm text-[#0E0E10]">Ends in:</span>
                <span className="text-sm font-semibold text-[#097D47]">
                  3 days
                  <span className="text-[10px] text-[#5A5D74]">
                    16 Mar 2025 at 19:37 EET
                  </span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start gap-[10px]">
              <p className="text-xs font-medium">
                Bid history
                <span className="text-main">( 37 bid )</span>
              </p>

              <BidderInfo
                name="Bidder Name"
                duration="16 h ago"
                amount="79IQD"
              />
              <BidderInfo
                name="Bidder Name"
                duration="16 h ago"
                amount="79IQD"
              />
              <BidderInfo
                name="Bidder Name"
                duration="16 h ago"
                amount="79IQD"
              />
              <BidderInfo
                name="Bidder Name"
                duration="16 h ago"
                amount="79IQD"
              />
              <BidderInfo
                name="Bidder Name"
                duration="16 h ago"
                amount="79IQD"
              />
            </div>
          </div>
          {/* right  */}
          <div className="flex-[1] w-full bg-whit p-6 flex flex-col gap-4 custom:border-l custom:border-lightBorder">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="border-[0.5px] border-lightBorder h-12 w-12 flex items-center justify-center rounded-md p-[6px]">
                  {svgs.store}
                </div>
                <div className="flex flex-col gap-1 items-center">
                  <span className="font-semibold text-xs text-headColor">
                    Sold by
                  </span>
                  <a className="font-bold text-sm text-main cursor-pointer underline decoration-main">
                    Dizzly
                  </a>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Rate
                  allowHalf
                  defaultValue={4.7}
                  disabled
                  style={{ color: "#FCAF23" }}
                />
                <p className="font-semibold text-sm text-blackTitle">
                  4.7 Star Rating
                </p>
                <p className="text-xs font-normal text-gray3">
                  (21.674 User feedback)
                </p>
              </div>
            </div>
            <StoreInfo noCash />
            <PaymentMethods />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSectionAuction;
