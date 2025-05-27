import { FavoriteProduct } from "@/types/wishlist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stat } from "fs";

interface WhishlistState {
  whishlistItems: FavoriteProduct[];
  inWhishlist: boolean;
}

const initialState: WhishlistState = {
  whishlistItems: [],
  inWhishlist: false,
};

const whishlistSlice = createSlice({
  name: "whishlist",
  initialState,
  reducers: {
    setWhishlistItems: (state, action: PayloadAction<FavoriteProduct[]>) => {
      state.whishlistItems = action.payload;
    },
    removeFromList: (
      state,
      action: PayloadAction<{ productId: string; groupName: string }>,
    ) => {
      const { productId, groupName } = action.payload;
      state.whishlistItems = state.whishlistItems.filter(
        (item) =>
          !(item.productId === productId && item.groupName === groupName),
      );
    },
  },
});

export const { removeFromList, setWhishlistItems } = whishlistSlice.actions;

export default whishlistSlice.reducer;
