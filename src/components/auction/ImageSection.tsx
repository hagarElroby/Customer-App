import { Button } from "antd";
import { svgs } from "../icons/svgs";
import React, { useState, useRef, useCallback, useEffect } from "react";
import DepositFlowModal from "./DepositPaymentFlow";
import { gitBid, payDeposit, placeBid } from "@/services/bid";
import showPopup from "../shared/ShowPopup";
import { AuctionDetails } from "@/types/auction";
import { toast } from "sonner";
import ImageGallery from "../productDetails/ImageGallery";

interface MediaModel {
  url: string;
  type: string;
}

const ImageSection = ({
  images,
  minimumBid,
  deposit,
  auctionId,
  auctionDetails,
}: {
  images: MediaModel[];
  minimumBid?: number;
  deposit?: number;
  auctionId: string;
  auctionDetails: AuctionDetails;
}) => {
  const [openDepositPopup, setOpenDepositPopup] = useState(false);

  const [loading, setLoading] = useState(false);
  const [bidAmount, setBidAmount] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [minimumAllowed, setMinimumAllowed] = useState<number>();
  const handleConfirm = async () => {
    setLoading(true);

    if (error) {
      toast.error(`Bid must be at least ${minimumAllowed} EGP`);
      setLoading(false);
      return;
    }

    try {
      const depositStatus = await gitBid({
        auctionId,
        bidAmount: Number(bidAmount),
      });

      // If user hasn't deposited before (null or empty string)
      const hasDeposited = !!depositStatus?.body;

      if (!hasDeposited) {
        await payDeposit({
          auctionId,
          paymentMethod: "WALLET",
          onSuccess: async () => {
            // Optionally show deposit success message
            // Now place bid after deposit
            await placeBid({
              auctionId,
              bidAmount: Number(bidAmount),
              onSuccess: (data) => {
                showPopup({
                  text: data.body || "Bid placed successfully!",
                  type: "success",
                });
              },
              onError: (err) => {
                showPopup({
                  text: err?.description || "Failed to place bid",
                  type: "failed",
                });
              },
            });
          },
          onError: (err) => {
            showPopup({
              text: err?.description || "Failed to pay deposit",
              type: "failed",
            });
          },
        });
      } else {
        // Already deposited, place bid directly
        await placeBid({
          auctionId,
          bidAmount: Number(bidAmount),
          onSuccess: (data) => {
            showPopup({
              text: data.body || "Bid placed successfully!",
              type: "success",
            });
          },
          onError: (err) => {
            showPopup({
              text: err?.description || "Failed to place bid",
              type: "failed",
            });
          },
        });
      }
    } catch (err) {
      showPopup({
        text: "Something went wrong. Please try again.",
        type: "failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full h-full items-center">
      <ImageGallery images={images} />

      <div className="flex flex-col gap-[14px] w-[90%] items-center mx-auto">
        <div className="flex items-center justify-between text-xl text-[#686C84] w-full h-11 rounded-full border border-[#C5C6D0] py-[10px] px-3">
          <input
            type="text"
            value={bidAmount}
            onChange={(e) => {
              const value = e.target.value;
              const numericValue = Number(value);

              // Validation
              const minimumAllowed =
                auctionDetails?.currentBid === 0
                  ? auctionDetails?.startBidFrom +
                    auctionDetails?.minimumBidPerTime
                  : auctionDetails?.currentBid +
                    auctionDetails?.minimumBidPerTime;

              if (value === "") {
                setBidAmount("");
                setError(null);
                return;
              }

              if (isNaN(numericValue) || numericValue < minimumAllowed) {
                setError(`Bid must be at least ${minimumAllowed} EGP`);
                setMinimumAllowed(minimumAllowed);
              } else {
                setError(null);
              }

              setBidAmount(value);
            }}
            className="w-full border-none outline-none text-black"
          />
          <span>IQD</span>
        </div>

        <div className="h-4">
          {error && <p className="text-red-500 text-sm m-auto">{error}</p>}
        </div>
        <Button
          type="primary"
          block
          className="full !h-12 !rounded-full !bg-main !text-base !text-white !w-[460px]"
          //TODO:: implement
          onClick={() => setOpenDepositPopup(true)}
        >
          Place bid
        </Button>
        <p className="text-xs text-[#686C84] font-bold">
          Minimum bid: {minimumBid} IQD. Or enter your own, higher{" "}
        </p>
      </div>

      <DepositFlowModal
        open={openDepositPopup}
        onClose={() => setOpenDepositPopup(false)}
        amount={deposit}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default ImageSection;
