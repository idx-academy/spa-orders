import { CartItem } from "@/types/cart.types";

export type CartDrawerItemProps = CartItem & {
  onRemove: (product: CartItem) => void;
};
