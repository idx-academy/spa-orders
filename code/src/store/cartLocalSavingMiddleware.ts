import { Action, Middleware } from "@reduxjs/toolkit";

import cartApi from "@/store/api/cartApi";
import { RootState } from "@/store/store";
import setLocalStorageCart from "@/utils/set-local-storage-cart/setLocalStorageCart";

const cartLocalSavingMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const isCartAction =
    (action as Action).type.startsWith("localCart") ||
    cartApi.endpoints.getCartItems.matchFulfilled(action);

  if (isCartAction) {
    const state = store.getState() as RootState;
    setLocalStorageCart(state.localCart);
  }

  return result;
};

export default cartLocalSavingMiddleware;
