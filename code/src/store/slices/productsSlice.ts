import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { sliceNames } from "@/store/constants";

type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
};

type ProductsState = {
  list: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};

const initialState: ProductsState = {
  list: [],
  status: "idle",
  error: null
};

const productsSlice = createSlice({
  name: sliceNames.products,
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.list = action.payload;
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.list.unshift(action.payload);
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.list = state.list.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProduct(state, action: PayloadAction<Product>) {
      const index = state.list.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    setLoading(state) {
      state.status = "loading";
    },
    setError(state, action: PayloadAction<string>) {
      state.status = "failed";
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    }
  }
});

export const {
  setProducts,
  addProduct,
  removeProduct,
  updateProduct,
  setLoading,
  setError,
  clearError
} = productsSlice.actions;

export default productsSlice.reducer;
