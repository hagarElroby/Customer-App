import { AllProductsDocs } from "@/types/product";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductState {
  products: AllProductsDocs[];
  totalPages: number;
  totalDocs: number;
}

const initialState: ProductState = {
  products: [],
  totalDocs: 0,
  totalPages: 0,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<AllProductsDocs[]>) => {
      state.products = action.payload;
    },
    clearProducts: (state) => {
      state.products = [];
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    clearTotalPages: (state) => {
      state.totalPages = 0;
    },
    setTotalDocs: (state, action: PayloadAction<number>) => {
      state.totalDocs = action.payload;
    },
    clearTotalDocs: (state) => {
      state.totalDocs = 0;
    },
  },
});

export const {
  setProducts,
  setTotalDocs,
  setTotalPages,
  clearProducts,
  clearTotalDocs,
  clearTotalPages,
} = productSlice.actions;

export default productSlice.reducer;
