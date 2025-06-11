import React, { useEffect, useRef, useState } from "react";
import ImageGallery from "./ImageGallery";
import { OneProductResponse } from "@/types/product";
import { svgs } from "../icons/svgs";
import BuyNowBtn from "./BuyNowBtn";
import QuantitySelector from "./QuantitySelector";
import WishlistButton from "./WishlistBtn";
import { Rate } from "antd";
import TitleAndValue from "./TitleAndValue";
import HrLine from "../shared/HrLine";
import PaymentMethods from "./PaymentMethods";
import StoreInfo from "./StoreInfo";
import { useDispatch, useSelector } from "react-redux";
import AddToCartBtn from "./AddToCartBtn";
import VariationList from "./variations/VariationList";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import { calculatePrices } from "@/utils/priceCalculation";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { addCart, getCarts, setQuantityCart } from "@/services/cart";
import { toast } from "sonner";
import { setCarts, setOrderSummery } from "@/redux/cartSlice";
import { createFavorite, removeFavorite } from "@/services/whishlist";
import { ResponseError } from "@/types/error-types";
interface TopSectionProps {
  product: OneProductResponse;
}

const TopSection: React.FC<TopSectionProps> = ({ product }) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  // Ref to store debounce timeout
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const { user, isLoggedIn } = useSelector((state: RootState) => state.auth);
  const [selectedVariation, setSelectedVariation] = useState(
    product.quantityAndPrice[0],
  );
  const [isInWishlist, setIsInWishlist] = useState<boolean>(
    selectedVariation.inWishlist,
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isDisabled, setIsDisabled] = useState(false);
  // useEffect(() => {
  //   const validQuantity = selectedVariation?.quantityInCart || 0;
  //   setQuantity(validQuantity > 0 ? validQuantity : 1);
  // }, [selectedVariation]);

  console.log("quantity", quantity);

  useEffect(() => {
    setIsInWishlist(selectedVariation.inWishlist);
    const validQuantity = selectedVariation?.quantityInCart || 0;
    setQuantity(validQuantity > 0 ? validQuantity : 1);
  }, [selectedVariation]);

  const increaseQuantity = () => {
    if (!isLoggedIn) {
      router.push("/auth/login/");
      return;
    }
    if (user?.role === "USER") {
      setQuantity((prev) => prev + 1);
    }
  };

  const decreaseQuantity = () => {
    if (!isLoggedIn) {
      router.push("/auth/login/");
      return;
    }
    if (user?.role === "USER") {
      if (quantity === 1) return;
      setQuantity((prev) => prev - 1);
    }
  };
  const [qunatityAndPrice, setQunatityAndPrice] = useState(
    product.quantityAndPrice,
  );

  const handleWishlistToggle = async (groupName: string) => {
    if (!isLoggedIn) {
      router.push("/auth/login/");
      return;
    }

    const productId = product._id;
    if (!productId || !groupName) return;

    const isCurrentlyInWishlist = qunatityAndPrice.find(
      (item) => item.groupName === groupName,
    )?.inWishlist;

    // Clear previous debounce timer
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      const updateWishlistState = () => {
        setQunatityAndPrice((prev) =>
          prev.map((item) =>
            item.groupName === groupName
              ? { ...item, inWishlist: !item.inWishlist }
              : item,
          ),
        );

        if (selectedVariation.groupName === groupName) {
          setIsInWishlist((prev) => !prev);
        }
      };

      const handleSuccess = (message: string) => {
        updateWishlistState();
        toast.success(message);
      };

      const handleError = (err: ResponseError) => {
        toast.error(err.description);
      };

      const action = isCurrentlyInWishlist ? removeFavorite : createFavorite;

      await action({
        productId,
        groupName,
        onSuccess: handleSuccess,
        onError: handleError,
      });

      debounceRef.current = null; // Reset debounceRef after request
    }, 300); // Delay of 300ms
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      router.push("/auth/login/");
      return;
    }

    if (user?.role === "USER") {
      const productId = product._id;
      const groupName = selectedVariation?.groupName;
      const stockNum = selectedVariation?.stock;
      if (!productId || !groupName) return;
      if (quantity > stockNum) {
        toast.info("Stock not have enough quantity");
        return;
      }

      setIsDisabled(true); // Disable button before sending request

      await setQuantityCart({
        productId,
        groupName,
        quantity,
        onSuccess: (data) => {
          toast.success(data);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });

      await getCarts({
        onSuccess: (data) => {
          dispatch(setCarts(data.docs));
          dispatch(setOrderSummery(data.orderSummary));
        },
      });

      // Keep button disabled for 2 seconds after request completes
      setTimeout(() => {
        setIsDisabled(false);
      }, 1000);
    }
  };

  // calculate current price, price before discount and saving amount
  const result = calculatePrices(
    selectedVariation.unitCost,
    product.vatPercentage,
    product.taxPercentage,
    product.discount?.percentage,
  );
  const { now, saving, was } = result;

  return (
    <div className="flex items-start justify-between flex-col custom:flex-row flex-wrap gap-3 px-3 py-5">
      {/* left section  */}
      <div
        className="flex-[1] min-w-[250px] max-w-[600px] mx-auto flex flex-col items-center justify-center 
      gap-4 bg-white rounded-3xl p-4 overflow-y-auto overflow-x-hidden"
      >
        <ImageGallery
          images={[
            { url: product.productCover, type: "img" },
            ...selectedVariation.productImages.map((img) => ({
              url: img,
              type: "img",
            })),
            {
              url: product.productVideo,
              type: "video",
            },
          ]}
        />
        <AddToCartBtn onClick={handleAddToCart} disabled={isDisabled} />
        <div className="flex gap-1 items-center justify-center w-full">
          <WishlistButton
            inWishlist={isInWishlist}
            onToggleWishlist={() =>
              handleWishlistToggle(selectedVariation.groupName)
            }
          />
          <QuantitySelector
            quantity={quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
          <BuyNowBtn
            //TODO:: navigate to Checkout page on click
            onClick={() => ""}
          />
        </div>
      </div>
      {/* right section  */}
      <div className="flex flex-col justify-between items-start gap-3 flex-[1.4] min-w-[250px] max-w-[1000px] h-auto mx-auto">
        {/* top  */}
        <div
          className="flex flex-col custom:flex-row items-start justify-between
          gap-3 p-4 bg-white rounded-3xl overflow-y-auto overflow-x-hidden"
        >
          {/* left  */}
          <div className="flex-[1] min-w-[230px] max-w-[420px] bg-white p-6 h-full flex flex-col gap-4">
            <p className="font-normal text-xl text-blackTitle">
              {product.productName}
            </p>
            <div className="flex flex-wrap gap-[6px] items-center">
              <Rate allowHalf defaultValue={product.rating} disabled />
              <p className="font-semibold text-sm text-blackTitle">
                {product.rating} Star Rating
              </p>
              <p className="text-xs font-normal text-gray3">
                ({product.ratingCount} User feedback)
              </p>
            </div>
            <TitleAndValue title="Brand" value="product brand" />
            <TitleAndValue
              title="Availability"
              isGreen
              value={
                product?.quantityAndPrice[0]?.stock > 0
                  ? "In Stock"
                  : "Out Of Stock"
              }
            />
            <HrLine className="my-2" />
            <div className="flex flex-col gap-2 items-start">
              <div className="flex flex-wrap items-center w-full gap-3">
                <TitleAndValue isGray title="Was" value={`${was}`} />
                <div className="w-[90px] h-6 rounded-[2px] py-[2px] px-1 bg-[#FFEBEB] flex items-center justify-center">
                  <span className="font-medium text-sm text-main">
                    {formatToTwoDecimals(product?.discount?.percentage)}% OFF
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center w-full gap-3">
                <TitleAndValue isRed title="Now" value={`${now}`} />
                {/* <p className="text-sm font-normal text-[#7E859B]">
                  Inclusive of VAT
                </p> */}
              </div>
              <TitleAndValue title="Saving" value={`${saving}`} />
            </div>
          </div>
          {/* right  */}
          <div className="flex-[1] w-full bg-whit p-6 flex flex-col gap-4 custom:border-l custom:border-lightBorder">
            <div className="flex items-center justify-between">
              {product.companyName && (
                <div className="flex items-center gap-2">
                  <div className="border-[0.5px] border-lightBorder h-12 w-12 flex items-center justify-center rounded-md p-[6px]">
                    {svgs.store}
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <span className="font-semibold text-xs text-headColor">
                      Sold by
                    </span>
                    <a className="font-bold text-sm text-main cursor-pointer underline decoration-main">
                      {product.companyName}
                    </a>
                  </div>
                </div>
              )}
              <div className="flex flex-col items-end gap-2">
                <div className="flex gap-2 items-center">
                  <p className="font-semibold text-sm text-blackTitle">
                    {product.rating} Star Rating
                  </p>
                  <Rate allowHalf defaultValue={product.rating} disabled />
                </div>
                <p className="text-xs font-normal text-gray3">
                  ({product.ratingCount} User feedback)
                </p>
              </div>
            </div>
            <StoreInfo />
            <PaymentMethods />
          </div>
        </div>
        {/* bottom  */}
        <VariationList
          variations={product.quantityAndPrice}
          onVariationClick={(qunatityAndPriceObject) =>
            setSelectedVariation(qunatityAndPriceObject)
          }
          selectedVariationName={selectedVariation.groupName}
        />
      </div>
    </div>
  );
};

export default TopSection;
