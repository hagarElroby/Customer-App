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
  },
});

export const { setCarts, setOrderSummery } = cartSlice.actions;

export default cartSlice.reducer;
