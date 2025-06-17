import { findAllFavorite } from "@/services/whishlist";
import { setWhishlistItems } from "@/redux/whishlistSlice";
import { AppDispatch } from "@/redux/store";
import { toast } from "sonner";

export const updateWishlistAndState = async ({
  dispatch,
}: {
  dispatch: AppDispatch;
}) => {
  await findAllFavorite({
    onSuccess: (data) => {
      dispatch(setWhishlistItems(data));
    },
    onError: () => {
      toast.error("Failed to update wishlist UI");
    },
  });
};
