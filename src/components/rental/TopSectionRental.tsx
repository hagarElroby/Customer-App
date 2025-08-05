"use client";
import TitleAndValue from "../productDetails/TitleAndValue";
import PaymentMethods from "../productDetails/PaymentMethods";
import StoreInfo from "../productDetails/StoreInfo";
import { svgs } from "../icons/svgs";
import { Button, Rate } from "antd";
import { RentalById } from "@/types/rentals";
import ImageGallery from "../productDetails/ImageGallery";
import PickRentalDate from "./PickRentalDate";
interface TopSectionProps {
  rental: RentalById;
}

const TopSectionRental: React.FC<TopSectionProps> = ({ rental }) => {
  return (
    <div className="flex items-start justify-between flex-col custom:flex-row flex-wrap gap-3 px-3 h-[770px] overflow-auto">
      {/* left section  */}
      <div
        className="flex-[1] min-w-[250px] max-w-[600px] mx-auto flex flex-col items-center justify-center 
      gap-6 bg-white rounded-3xl p-4 overflow-y-auto overflow-x-hidden h-full"
      >
        {rental && rental.media && (
          <ImageGallery
            images={[
              { url: rental.media.productCover, type: "img" },
              ...rental.media.productImages.map((img) => ({
                url: img,
                type: "img",
              })),
              {
                url: rental.media.productVideo,
                type: "video",
              },
            ]}
          />
        )}

        <PickRentalDate
          onChange={({ startDate, endDate }) => {
            console.log("Selected Dates:", { startDate, endDate });
          }}
        />

        <div className="flex items-center justify-between text-xl text-[#686C84] w-full h-11 rounded-full border border-[#C5C6D0] py-[10px] px-3">
          <span className="w-full border-none outline-none text-black">
            {rental.rentalDetails.pricePerDay}
          </span>
          <span>IQD</span>
        </div>

        <Button
          type="primary"
          block
          className="full !h-12 !rounded-full !bg-main !text-base !text-white !w-[460px]"
          //TODO:: implement
          onClick={() => ""}
        >
          Send a request
        </Button>
        <p className="text-xs text-[#686C84] font-bold">
          No strings attached when you send a request and you can ask questions
          to Tom E
        </p>
      </div>

      {/* right section  */}
      <div className="flex flex-col justify-between gap-3 flex-[1.4] min-w-[250px] max-w-[1000px] h-full  rounded-3xl overflow-y-auto overflow-x-hidden bg-white mx-auto">
        {/* top  */}
        <div
          className="flex flex-col custom:flex-row items-start justify-between
          gap-3 p-4"
        >
          {/* left  */}
          <div className="flex-[1.8] min-w-[230px] bg-white p-6 h-full flex flex-col gap-4">
            <p className="font-normal text-xl text-blackTitle">
              {rental.productName}
            </p>
            <div className="flex items-center gap-6">
              <TitleAndValue
                title="Category"
                value={rental?.subCategory?.category?.name}
              />
              <TitleAndValue
                title="Subcategory"
                value={rental?.subCategory?.name}
              />
            </div>

            <div className="bg-[#F6F6F8] flex my-2 w-full justify-between gap-3 px-5 py-2">
              <div className="flex flex-col items-start gap-[5px]">
                <span className="text-sm text-[#0E0E10]">Current bid:</span>
                {/* <span className="text-sm font-semibold text-[#097D47]">
                  {!!rental?.rentalDetails?.currentBid
                    ? `${rental?.rentalDetails?.currentBid} IQD`
                    : "No Bid Yet"}
                </span> */}
              </div>
              <div className="flex flex-col items-start gap-[5px]">
                <span className="text-sm text-[#0E0E10]">Ends in:</span>
                <span className="text-sm font-semibold text-[#097D47]">
                  {/* {getTimeRemaining(auction?.rentalDetails?.endDate)} */}
                  {/* <span className="text-[10px] text-[#5A5D74]">
                    16 Mar 2025 at 19:37 EET
                  </span> */}
                </span>
              </div>
            </div>

            {/* {auction?.bids?.totalBids?.count > 0 && (
              <div className="flex flex-col items-start gap-[10px]">
                <p className="text-xs font-medium">
                  Bid history
                  <span className="text-main">
                    ({auction?.bids?.totalBids?.count})
                  </span>
                </p>

                {auction?.bids?.recentBids && (
                  <BidHistory bids={auction.bids.recentBids} />
                )}
              </div>
            )} */}
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
                    {rental?.seller?.firstName + " " + rental?.seller?.lastName}
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

export default TopSectionRental;
