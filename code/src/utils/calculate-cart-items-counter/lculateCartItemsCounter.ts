import { CartItem } from "@/types/cart.types";

const calculateCartItemsCounter = (items: CartItem[]) => {
  const cartItemsCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return cartItemsCount && cartItemsCount > 99 ? "99+" : cartItemsCount;
};

export default calculateCartItemsCounter;
