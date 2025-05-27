import { CartProduct } from "@/types/cart";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import { useRef, useState } from "react";
import QuantitySelector from "../shared/QuantitySelector";
import WishlistButton from "../shared/WishlistBtn";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import RemoveBtn from "./RemoveBtn";
import { useRouter } from "next/navigation";
import { getCarts, removeCart, setQuantityCart } from "@/services/cart";
import { toast } from "sonner";
import {
  removeFromCart,
  toggleWishlistInCartPage,
  updateQuantity,
} from "@/redux/cartSlice";
import { createFavorite, removeFavorite } from "@/services/whishlist";
import { removeFromList } from "@/redux/whishlistSlice";

const CartItem: React.FC<CartProduct> = ({
  _id,
  quantity,
  productCover,
  groupName,
  productId,
  productName,
  companyName,
  discountPercentage,
  qunatityAndPrice,
  inWishlist,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [quantityValue, setQuantityValue] = useState<number>(quantity);
  const [isInWishlist, setIsInWishlist] = useState<boolean>(inWishlist);
  const afterDiscount = qunatityAndPrice.priceAfterDiscount;
  const beforeDiscount = qunatityAndPrice.priceBeforeDiscount;
  const discount = beforeDiscount - afterDiscount;
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  const handleQuantityChange = async (newQuantity: number) => {
    if (!productId || !groupName) return;
    setQuantityValue(newQuantity);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(async () => {
      await setQuantityCart({
        productId,
        groupName,
        quantity: newQuantity,
        onSuccess: (data) => {
          toast.success(data);
        },
        onError: (err) => {
          toast.error(err.description);
        },
      }),
        dispatch(
          updateQuantity({ productId, groupName, quantity: newQuantity }),
        );
    }, 1000);
  };

  const increaseQuantity = () => handleQuantityChange(quantityValue + 1);
  const decreaseQuantity = () =>
    handleQuantityChange(Math.max(quantityValue - 1, 1));

  const handleWishlistToggle = async () => {
    if (!productId || !groupName) return;

    const newWishlistState = !isInWishlist;

    if (newWishlistState) {
      await createFavorite({
        productId,
        groupName,
        onSuccess: (data) => {
          toast.success(data || "Product added to wish list successfully");
        },
        onError: (e) => {
          toast.error(e.description || "Failed to add to whishlist");
        },
      });
    } else {
      await removeFavorite({
        productId,
        groupName,
        onSuccess: (data) => {
          toast.success(data || "Product removed from wish list successfully");
        },
        onError: (e) => {
          toast.error(e.description || "Failed to remove from whishlist");
        },
      });
      dispatch(removeFromList({ productId, groupName }));
    }

    setIsInWishlist(newWishlistState);
    dispatch(
      toggleWishlistInCartPage({
        productId,
        groupName,
        isInWishlist: newWishlistState,
      }),
    );
  };
  const handleRemoveFromCart = async () => {
    if (!_id || !groupName || !productId) return;
    await removeCart({
      cartId: _id,
      onSuccess: (data) => {
        toast.success(data);
      },
      onError: (err) => {
        toast.error(err.description);
      },
    });
    dispatch(removeFromCart({ productId: _id, groupName }));
  };

  const handleClickCartItem = () => {
    router.push(`/product?id=${productId}`);
  };

  return (
    <div className="flex items-center flex-wrap flex-col md:flex-row justify-between gap-6 p-6 h-auto">
      <div
        onClick={handleClickCartItem}
        className="flex-[1] flex items-center justify-center w-[150px] h-[180px] cursor-pointer"
      >
        <img
          src={productCover}
          alt={groupName}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-[3] flex flex-col gap-6 items-start">
        <h3
          onClick={handleClickCartItem}
          className="font-bold text-sm text-headColor cursor-pointer"
        >
          {productName}
        </h3>
        <span className="font-bold text-[10px] text-profileLabel capitalize">
          Get It <span className="text-[#38AE04]">Soon</span>
        </span>
        <span className="font-normal text-sm text-[#7E859B] capitalize">
          Sold By <span className="text-productLabel">{companyName}</span>
        </span>
        <QuantitySelector
          width="190px"
          quantity={quantityValue}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
        />
      </div>

      <div className="flex-[1] flex flex-col justify-between items-end h-[180px]">
        <div className="flex flex-col items-end gap-2">
          <p className="font-bold text-xl text-[#111111]">
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
        <div className="flex items-center gap-3">
          <WishlistButton
            inWishlist={isInWishlist}
            onToggleWishlist={handleWishlistToggle}
          />
          <RemoveBtn onClick={handleRemoveFromCart} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
