"use client";
import NavigationBar from "@/components/shared/NavigationBar";
import SectionTitle from "@/components/shared/SectionTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HrLine from "@/components/shared/HrLine";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import CartItem from "@/components/cart/CartItem";
import SummeryItem from "@/components/cart/SummeryItem";
import Coupon from "@/components/cart/Coupon";
import CheckoutBtn from "@/components/cart/CheckoutBtn";
import NoYetImg from "@/components/shared/NoYetImg";
import NoYetText from "@/components/shared/NoYetText";
import { useEffect, useState } from "react";
import { updateCartAndState } from "@/utils/cartHelpers";
import Loading from "@/components/shared/Loading";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state: RootState) => state.cart);
  const carts = cartState?.carts ?? [];
  const orderSummery = cartState?.orderSummery ?? {};
  const allItemsQuantity = cartState?.allItemsQuantity ?? 0;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      await updateCartAndState({
        dispatch,
      });
      setLoading(false);
    };

    fetchCart();
  }, [dispatch]);

  return (
    <main className="pb-7 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      <NavigationBar />

      {loading ? (
        <Loading />
      ) : carts.length > 0 ? (
        <div className="flex flex-col md:flex-row justify-between items-start py-5 lg:py-7 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14 gap-5 lg:gap-7">
          <div className="flex w-[80vw] mx-auto md:flex-[1.8] flex-col gap-4">
            <SectionTitle
              title="Cart"
              height="auto"
              children={
                <button className="w-[70px] lg:w-[85px] h-7 lg:h-8 rounded-[30px] bg-main p-2 flex items-center justify-center text-white text-[10px] lg:text-xs font-medium overflow-hidden line-clamp-1">
                  {carts?.length} items
                </button>
              }
            />
            <div className="flex flex-col gap-3 lg:gap-5 xl:gap-6 bg-white rounded-xl">
              {carts.map((cart, index) => (
                <>
                  <CartItem key={cart._id} {...cart} />
                  {carts.length - 1 !== index && <HrLine />}
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2 mx-auto w-[80vw] md:w-[300px] lg:w-[400px] xl:w-[500px]">
            <div className="flex-[1] bg-white w-full h-[283px] rounded-xl p-6 flex flex-col gap-3">
              <h2 className="font-bold text-sm lg:text-base text-[#111111]">
                Order summary
              </h2>
              <SummeryItem
                text={`Sub-total (${allItemsQuantity} items)`}
                value={`IQD${formatToTwoDecimals(orderSummery?.totalBeforeDiscount ?? 0)}`}
              />
              <SummeryItem text="Shipping" value="Free" />
              <SummeryItem
                text="Discount"
                value={`IQD${formatToTwoDecimals(orderSummery?.discount ?? 0)}`}
              />
              <SummeryItem
                text="Tax"
                value={`IQD${formatToTwoDecimals(orderSummery?.tax ?? 0)}`}
              />
              <SummeryItem
                text="Vat"
                value={`IQD${formatToTwoDecimals(orderSummery?.vat ?? 0)}`}
              />
              <HrLine />
              <SummeryItem
                isBold
                text="Total"
                value={`${formatToTwoDecimals(orderSummery?.grandTotal ?? 0)}`}
              />
            </div>
            <Coupon onClick={() => ""} />
            <CheckoutBtn onClick={() => ""} />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full overflow-hidden mt-10">
          <NoYetImg />
          <NoYetText
            title="No Items in Your Cart Yet"
            text="Browse our categories and add items to your cart!"
          />
        </div>
      )}
    </main>
  );
};

export default CartPage;
