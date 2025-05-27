import { CartProduct, OrderSummary } from "@/types/cart";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  carts: CartProduct[];
  orderSummery: OrderSummary | null;
  quantity: number;
  allItemsQuantity: number;
}

const initialState: CartState = {
  carts: [],
  orderSummery: null,
  quantity: 0,
  allItemsQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCarts: (state, action: PayloadAction<CartProduct[]>) => {
      state.carts = action.payload;
    },
    setOrderSummery: (state, action: PayloadAction<OrderSummary>) => {
      state.orderSummery = action.payload;
    },
    addToCart: (state, action: PayloadAction<number>) => {
      state.quantity = action.payload;
    },
    removeFromCart: (
      state,
      action: PayloadAction<{ productId: string; groupName: string }>,
    ) => {
      const { productId, groupName } = action.payload;
      state.carts = state.carts.filter(
        (item) => !(item._id === productId && item.groupName === groupName),
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        productId: string;
        groupName: string;
        quantity: number;
      }>,
    ) => {
      const { productId, groupName, quantity } = action.payload;
      const product = state.carts.find(
        (item) => item._id === productId && item.groupName === groupName,
      );
      if (product) {
        product.quantity = quantity;
      }
    },
    toggleWishlistInCartPage: (
      state,
      action: PayloadAction<{
        productId: string;
        groupName: string;
        isInWishlist: boolean;
      }>,
    ) => {
      const { productId, groupName, isInWishlist } = action.payload;
      const product = state.carts.find(
        (item) => item._id === productId && item.groupName === groupName,
      );
      if (product) {
        product.inWishlist = isInWishlist;
      }
    },
  },
});

export const {
  setCarts,
  setOrderSummery,
  addToCart,
  removeFromCart,
  updateQuantity,
  toggleWishlistInCartPage,
} = cartSlice.actions;

export default cartSlice.reducer;
