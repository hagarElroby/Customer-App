import { CartProduct } from "@/types/cart";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import { useRef, useState } from "react";
import QuantitySelector from "../shared/QuantitySelector";
import WishlistButton from "../shared/WishlistBtn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";
import { addCart, getCarts, removeCart } from "@/services/cart";
import { toast } from "sonner";
import { createFavorite, removeFavorite } from "@/services/whishlist";
import { updateCartAndState } from "@/utils/cartHelpers";
import { updateWishlistAndState } from "@/utils/updateWishlistAndState";

const CartItem: React.FC<CartProduct> = ({
  _id,
  quantity,
  productCover,
  groupName,
  productId,
  productName,
  companyName,
  discountPercentage,
  quantityAndPrice,
  inWishlist,
  stock,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [quantityValue, setQuantityValue] = useState<number>(quantity);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(inWishlist);
  const afterDiscount = quantityAndPrice.priceAfterDiscount;
  const beforeDiscount = quantityAndPrice.priceBeforeDiscount;
  const discount = beforeDiscount - afterDiscount;
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const debouncedUpdate = (callback: () => void) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(callback, 500);
  };

  const increaseQuantity = (newQuantity: number) => {
    if (!productId || !groupName) return;

    //TODO:: will change check in stock based on backend logic if he decrease stock based on add to cart
    if (newQuantity > stock) {
      toast.error("Not enough quantity in stock");
      return;
    }

    setQuantityValue(newQuantity);
    debouncedUpdate(async () => {
      await addCart({
        productId,
        groupName,
        quantity: newQuantity - quantity,
        onSuccess: async (data) => {
          toast.success(data);
          await updateCartAndState({ dispatch });
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    });
  };

  const decreaseQuantity = (newQuantity: number) => {
    if (!productId || !groupName) return;

    setQuantityValue(newQuantity);
    debouncedUpdate(async () => {
      await removeCart({
        productId,
        groupName,
        quantityToBeRemoved: quantity - newQuantity,
        onSuccess: async (data) => {
          toast.success(data);
          await updateCartAndState({ dispatch });
        },
        onError: (err) => {
          toast.error(err.description);
        },
      });
    });
  };

  const handleRemoveFromCart = async () => {
    if (!_id || !groupName || !productId) return;

    await removeCart({
      productId,
      groupName,
      quantityToBeRemoved: quantity,
      onSuccess: async (data) => {
        toast.success(data);
        await updateCartAndState({ dispatch });
      },
      onError: (err) => {
        toast.error(err.description);
      },
    });
  };

  const handleWishlistToggle = async () => {
    if (!productId || !groupName) return;

    const newWishlistState = !isInWishlist;

    if (newWishlistState) {
      await createFavorite({
        productId,
        groupName,
        onSuccess: async (data) => {
          toast.success(data || "Product added to wish list successfully");
          await updateWishlistAndState({ dispatch });
        },
        onError: (e) => {
          toast.error(e.description || "Failed to add to whishlist");
        },
      });
    } else {
      await removeFavorite({
        productId,
        groupName,
        onSuccess: async (data) => {
          toast.success(data || "Product removed from wishlist successfully");
          await updateWishlistAndState({ dispatch });
        },
        onError: (e) => {
          toast.error(e.description || "Failed to remove from whishlist");
        },
      });
    }

    setIsInWishlist(newWishlistState);
  };

  const handleClickCartItem = () => {
    router.push(`/product?id=${productId}`);
  };

  return (
    <div className="w-full flex items-center flex-row gap-3 lg:gap-5 xl:gap-6 p-3 lg:p-5 xl:p-6 h-auto">
      <div
        onClick={handleClickCartItem}
        className="flex items-center justify-center min-w-[150px] max-w-[150px] h-[180px] cursor-pointer overflow-hidden"
      >
        <img
          src={productCover}
          alt={groupName}
          className="w-full h-full object-contain"
        />
      </div>

      <div className="flex flex-col xl:flex-row justify-between gap-3 lg:gap-5 xl:gap-6 w-full">
        <div className="flex flex-col gap-4 xl:gap-6 items-start w-full">
          <h3
            onClick={handleClickCartItem}
            className="font-bold text-sm text-headColor cursor-pointer"
          >
            {`${productName} ${groupName}`}
          </h3>
          <span className="font-bold text-[10px] text-profileLabel capitalize">
            Get It <span className="text-[#38AE04]">Soon</span>
          </span>

          <div className="flex flex-col sm:flex-row gap-2">
            <p className="font-bold text-base lg:text-xl text-[#111111]">
              IQD
              {formatToTwoDecimals(afterDiscount)}
            </p>
            {!!beforeDiscount && !!discountPercentage && (
              <p className="flex items-center gap-1">
                <p className="text-xs line-through font-normal text-[#7E859B]">
                  IQD
                  {formatToTwoDecimals(beforeDiscount)}
                </p>
                <span className="text-bold text-xs text-main">
                  {formatToTwoDecimals(discountPercentage * 100)}% OFF
                </span>
              </p>
            )}
          </div>

          {companyName && (
            <span className="font-normal text-xs lg:text-sm text-[#7E859B] capitalize">
              Sold By <span className="text-productLabel">{companyName}</span>
            </span>
          )}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full">
            <QuantitySelector
              width="190px"
              quantity={quantityValue}
              onIncrease={() => increaseQuantity(quantityValue + 1)}
              onDecrease={() => {
                if (quantityValue > 1) {
                  decreaseQuantity(quantityValue - 1);
                } else {
                  handleRemoveFromCart();
                }
              }}
            />
            <div className="flex items-center gap-3">
              <WishlistButton
                inWishlist={isInWishlist}
                onToggleWishlist={handleWishlistToggle}
              />
              <RemoveBtn onClick={handleRemoveFromCart} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
