import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SmallRoundedCont from "./SmallRoundedCont";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import { AllProductsDocs } from "@/types/product";
import { svgs } from "../icons/svgs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addCart, getCarts } from "@/services/cart";
import { toast } from "sonner";
import { createFavorite, removeFavorite } from "@/services/whishlist";
import { setCarts, setOrderSummery } from "@/redux/cartSlice";
import { updateWishlistAndState } from "@/utils/updateWishlistAndState";
import { updateCartAndState } from "@/utils/cartHelpers";

const BestProduct: React.FC<
  AllProductsDocs & {
    sponsored?: boolean;
    className?: string;
    style?: React.CSSProperties;
  }
> = ({
  _id,
  productName,
  productCover,
  seller,
  rating,
  groupName,
  ratingCount,
  PriceBeforeDiscount,
  PriceAfterDiscount,
  inWishlist,
  inCart,
  quantityAndPrice,
  sponsored = false,
  className,
  style,
}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isInWishlist, setIsInWishlist] = useState(inWishlist);
  const [isInCart, setIsInCart] = useState(inCart);
  const { user } = useSelector((state: RootState) => state.auth);

  const handleClickProduct = () => {
    if (!_id || !groupName) return;
    router.push(`/product?id=${_id}&group=${groupName}`);
  };

  const handleWishlistToggle = async () => {
    if (!_id || !groupName) return;

    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (isInWishlist) {
      await removeFavorite({
        productId: _id,
        groupName,
        onSuccess: (data) => {
          setIsInWishlist(false);
          toast.success(data);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    } else {
      await createFavorite({
        productId: _id,
        groupName,
        onSuccess: (data) => {
          setIsInWishlist(true);
          toast.success(data);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    }

    // refresh wishlist after toggle
    updateWishlistAndState({ dispatch });
  };

  const handleAddToCart = async () => {
    if (!_id || !groupName) return;
    if (!user) {
      router.push("/auth/login");
      return;
    }

    if (isInCart === false) {
      await addCart({
        productId: _id,
        groupName,
        quantity: 1,
        onSuccess: async (data) => {
          setIsInCart(true);
          updateCartAndState({ dispatch });
          toast.success(data);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    }
  };

  return (
    <div
      onClick={handleClickProduct}
      className={`cursor-pointer w-36 h-[320px] xs:w-[167px] xs:h-[348px] md:w-[265px] xl:w-[280px] md:h-[450px] p-2 xl:p-3 bg-white rounded-md flex flex-col md:gap-2 ${className}`}
      style={style}
    >
      <div className="hidden md:flex items-center justify-between w-full">
        <SmallRoundedCont isGrayBg={sponsored}>
          <span className="text-white font-medium text-xs">
            {sponsored ? "sponsored" : "Best Seller"}
          </span>
        </SmallRoundedCont>
        <SmallRoundedCont className="bg-white h-[23px] w-[86px] shadow-custom-4 gap-[2px]">
          {svgs.star}
          <span className="text-main font-semibold text-xs">{rating}</span>
          <span className="text-main font-medium text-[10px]">
            ( {ratingCount} )
          </span>
        </SmallRoundedCont>
      </div>

      <div className="flex md:hidden items-center justify-between w-full">
        <SmallRoundedCont className="bg-white h-[23px] w-[86px] shadow-custom-4 gap-[2px]">
          {svgs.star}
          <span className="text-main font-semibold text-xs">{rating}</span>
          <span className="text-main font-medium text-[10px]">
            ( {ratingCount} )
          </span>
        </SmallRoundedCont>

        <button
          onClick={(e) => {
            handleWishlistToggle();
            e.stopPropagation();
          }}
          className="block md:hidden"
        >
          {isInWishlist ? svgs.mobileRedHeart : svgs.mobileWhiteHeart}
        </button>
      </div>

      {/* Image Section */}
      <div className="relative w-full">
        <div className="w-full h-[168px] md:h-[250px] cursor-pointer">
          <img
            src={quantityAndPrice?.productImages[0] || productCover}
            alt={`${productName} image`}
            className="w-full h-full object-cover"
          />
        </div>
        <div
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-2 absolute z-10 right-0 bottom-0"
        >
          <button
            onClick={(e) => {
              handleWishlistToggle();
              e.stopPropagation();
            }}
            className="hidden md:block"
          >
            {isInWishlist ? svgs.redHeart : svgs.whiteHeart}
          </button>
          <button
            onClick={(e) => {
              handleAddToCart();
              e.stopPropagation();
            }}
            className="hidden md:block"
          >
            {isInCart ? svgs.addedToCart : svgs.addCart}
          </button>
          <button
            onClick={(e) => {
              handleAddToCart();
              e.stopPropagation();
            }}
            className="md:hidden"
          >
            {isInCart ? svgs.mobileAddedToCart : svgs.mobileAddCart}
          </button>
        </div>
      </div>
      {/* Text Section */}
      <div className="flex flex-col items-start gap-2">
        <span className="text-[10px] text-homeText font-bold uppercase line-clamp-1">
          {seller?.companyName}
        </span>
        <span className="text-sm md:text-[15px] text-homeHeaders font-bold capitalize line-clamp-3">
          {`${productName} ${groupName}`}
        </span>

        <div className="flex flex-col md:flex-row md:gap-2">
          {PriceAfterDiscount > 0 && (
            <span className="text-base text-[#2D8653] font-bold">
              IQD{formatToTwoDecimals(PriceAfterDiscount)}
            </span>
          )}
          <span
            className={`text-[13px] lg:text-base font-bold ${PriceAfterDiscount > 0 ? "line-through text-homeText" : "text-[#2D8653]"}`}
          >
            IQD{formatToTwoDecimals(PriceBeforeDiscount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BestProduct;
