import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { initialCart } from "@/constants/cart";
import { useAppSelector } from "@/hooks/use-redux/useRedux";
import cartApi from "@/store/api/cartApi";
import { sliceNames } from "@/store/constants";
import { RootState } from "@/store/store";
import { CartItem } from "@/types/cart.types";
import getLocalStorageCart from "@/utils/get-local-storage-cart/getLocalStorageCart";

const initialState = getLocalStorageCart();

export const removeFromLocalCart = createAsyncThunk(
  `${sliceNames.localCart}/removeFromCart`,
  async (cartItem: CartItem, storeApi) => {
    const { localCart } = storeApi.getState() as RootState;

    const existingItem = localCart.items.find(
      (item) => item.productId === cartItem.productId
    );

    if (existingItem) {
      storeApi.dispatch(localCartSlice.actions.removeFromLocalCart(cartItem));
    } else {
      throw new Error("Item not found in cart");
    }
  }
);

export const addToLocalCart = createAsyncThunk(
  `${sliceNames.localCart}/addToLocalCart`,
  async (params: CartItem, storeApi) => {
    const { localCart } = storeApi.getState() as RootState;

    const existingItem = localCart.items.find(
      (item) => item.productId === params.productId
    );

    if (!existingItem) {
      storeApi.dispatch(localCartSlice.actions.addToLocalCart(params));
    } else {
      throw new Error("Item is already in cart");
    }
  }
);

const localCartSlice = createSlice({
  initialState,
  name: sliceNames.localCart,
  reducers: {
    addToLocalCart: (state, action: PayloadAction<CartItem>) => {
      state.totalPrice += action.payload.calculatedPrice;
      state.items = [...state.items, action.payload];
    },
    removeFromLocalCart: (state, action: PayloadAction<CartItem>) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload.productId
      );
      state.totalPrice -= action.payload.calculatedPrice;
    },
    clearLocalCart: () => initialCart
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      cartApi.endpoints.getCartItems.matchFulfilled,
      (_, action) => action.payload
    );
  }
});

export const useLocalCartSelector = () =>
  useAppSelector((store) => store.localCart);

export const { clearLocalCart } = localCartSlice.actions;

export default localCartSlice.reducer;
