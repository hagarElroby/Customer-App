"use client";
import NavigationBar from "@/components/shared/NavigationBar";
import SectionTitle from "@/components/shared/SectionTitle";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HrLine from "@/components/shared/HrLine";
import { formatToTwoDecimals } from "@/utils/formatToTwoDecimals";
import CartItem from "@/components/cart/CartItem";
import SummeryItem from "@/components/cart/SummeryItem";
import Coupon from "@/components/cart/Coupon";
import CheckoutBtn from "@/components/cart/CheckoutBtn";
import NoYetImg from "@/components/shared/NoYetImg";
import NoYetText from "@/components/shared/NoYetText";

const CartPage = () => {
  const { carts, orderSummery, allItemsQuantity } =
    useSelector((state: RootState) => state.cart) || [];

  return (
    <main className="pb-7 flex flex-col gap-10 w-full flex-grow bg-homeBg">
      <NavigationBar />
      {carts.length ? (
        <div className="flex justify-between flex-wrap items-start py-7 px-14 gap-7">
          <div className="flex flex-[1.8] flex-col gap-4">
            <SectionTitle
              title="Cart"
              height="auto"
              children={
                <button className="w-[85px] h-8 rounded-[30px] bg-main p-2 flex items-center justify-center text-white text-xs font-medium">
                  {carts?.length} items
                </button>
              }
            />
            <div className="flex flex-col gap-6 bg-white rounded-xl p-6">
              {carts?.map((cart, index) => (
                <>
                  <CartItem {...cart} />
                  {carts?.length - 1 !== index && <HrLine />}
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex-[1] bg-white w-[90vw] md:w-[500px] h-[283px] rounded-xl p-6 flex flex-col gap-3">
              <h2 className="font-bold text-base text-[#111111]">
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
            <Coupon
              //TODO: redirect to Checkout page when it available
              onClick={() => ""}
            />
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
