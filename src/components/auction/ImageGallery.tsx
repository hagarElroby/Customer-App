import { Button } from "antd";
import { svgs } from "../icons/svgs";
import React, { useState, useRef, useCallback, useEffect } from "react";
import DepositFlowModal from "../auction/DepositPaymentFlow";
import { gitBid, payDeposit, placeBid } from "@/services/bid";
import showPopup from "../shared/ShowPopup";
import { AuctionDetails } from "@/types/auction";
import { toast } from "sonner";

interface MediaModel {
  url: string;
  type: string;
}

const ImageGallery = ({
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
  const [selectedImage, setSelectedImage] = useState<MediaModel | null>(null);
  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  const thumbnailRef = useRef<HTMLDivElement>(null);
  // Check if scrolling is possible based on the number of images
  const [canScrollUp, setCanScrollUp] = useState(false);
  const [canScrollDown, setCanScrollDown] = useState(() => {
    return images.length > 4;
  });

  const updateScrollButtons = useCallback(() => {
    if (thumbnailRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = thumbnailRef.current;
      setCanScrollUp(scrollTop > 0);
      setCanScrollDown(scrollTop + clientHeight < scrollHeight);
    }
  }, []);

  useEffect(() => {
    const ref = thumbnailRef.current;
    if (ref) {
      ref.addEventListener("scroll", updateScrollButtons);
      return () => ref.removeEventListener("scroll", updateScrollButtons);
    }
  }, [updateScrollButtons]);

  const handleHover = (image: MediaModel) => {
    setSelectedImage(image);
  };

  const scrollThumbnails = (direction: "up" | "down") => {
    if (thumbnailRef.current) {
      const scrollAmount = 100;
      thumbnailRef.current.scrollBy({
        top: direction === "up" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

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
      <div className="flex gap-3 h-[400px] w-full">
        <div className="flex-[1] flex flex-col gap-6 items-center relative h-full py-3">
          {canScrollUp && (
            <button onClick={() => scrollThumbnails("up")}>{svgs.down}</button>
          )}
          <div
            ref={thumbnailRef}
            style={{ direction: "rtl" }}
            className="flex flex-col gap-2 overflow-y-auto h-full scrollbar-hide px-2"
          >
            {images?.map((img, index) => {
              if (img.type === "img") {
                return (
                  <img
                    key={index}
                    src={img.url}
                    alt={`product image ${index}`}
                    className={`w-24 h-24 object-cover cursor-pointer border-2 ${
                      selectedImage === img
                        ? "border-main"
                        : "border-homeBorderCard"
                    }`}
                    onMouseEnter={() => handleHover(img)}
                  />
                );
              }

              return (
                <video
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  key={index}
                  src={img.url}
                  className={`w-24 h-24 object-cover cursor-pointer border-2 ${
                    selectedImage === img
                      ? "border-main"
                      : "border-homeBorderCard"
                  }`}
                  onMouseEnter={() => handleHover(img)}
                />
              );
            })}
          </div>
          {canScrollDown && (
            <button onClick={() => scrollThumbnails("down")}>
              {svgs.down}
            </button>
          )}
        </div>
        <div className="flex-[3.4] w-full h-full border border-homeBorderCard rounded-xl overflow-hidden">
          {selectedImage?.type === "img" && (
            <img
              src={selectedImage.url}
              alt="selected product"
              className="w-full h-full object-cover"
            />
          )}

          {selectedImage?.type === "video" && (
            <video
              controls
              src={selectedImage.url}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>

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
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
        <Button
          type="primary"
          block
          className="full !h-12 !rounded-full !bg-main !text-base !text-white !w-[412px]"
          //TODO:: implemen
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

export default ImageGallery;
