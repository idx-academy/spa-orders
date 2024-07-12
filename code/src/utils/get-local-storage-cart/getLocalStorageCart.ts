import { initialCart } from "@/constants/cart";
import { LOCAL_STORAGE_KEYS } from "@/constants/common";
import { CartType } from "@/types/cart.types";

const getLocalStorageCart = (): CartType => {
  const localStorageCart = window.localStorage.getItem(
    LOCAL_STORAGE_KEYS.localCart
  );

  let cart = initialCart;

  if (localStorageCart) {
    try {
      const parsedCart = JSON.parse(localStorageCart);

      const isLocalStorageCartValid =
        !parsedCart.totalPrice ||
        !parsedCart.items ||
        !Array.isArray(parsedCart.items);

      if (isLocalStorageCartValid) {
        throw new Error("Invalid cart");
      }

      cart = parsedCart;
    } catch {
      // If the cart is invalid, initialCart is returned
    }
  }

  return cart;
};

export default getLocalStorageCart;
