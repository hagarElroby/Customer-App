import { FavoriteProduct } from "@/types/wishlist";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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
  },
});

export const { setWhishlistItems } = whishlistSlice.actions;

export default whishlistSlice.reducer;
