import { getCarts } from "@/services/cart";
import { setCarts, setOrderSummery } from "@/redux/cartSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "sonner";

export const updateCartAndState = async ({
  dispatch,
}: {
  dispatch: AppDispatch;
}) => {
  await getCarts({
    onSuccess: (data) => {
      dispatch(setCarts(data.docs));
      dispatch(setOrderSummery(data.orderSummary));
    },
    onError: () => {
      toast.error("Failed to update cart UI");
    },
  });
};
