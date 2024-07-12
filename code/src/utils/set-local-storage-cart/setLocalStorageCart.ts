import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { CartType } from "@/types/cart.types";

const setLocalStorageCart = (cart: CartType) => {
  window.localStorage.setItem(
    LOCAL_STORAGE_KEYS.localCart,
    JSON.stringify(cart)
  );
};

export default setLocalStorageCart;
