import { UserId } from "@/types/user.types";

export type CartManagementPostParams = {
  productId: string;
  userId: UserId;
};

export type CartManagementDeleteParams = {
  productId: string;
  userId: UserId;
};

export type CartManagementGetParams = {
  userId: UserId;
};

export type CartItem = {
  productId: string;
  image: string;
  name: string;
  productPrice: number;
  quantity: number;
  calculatedPrice: number;
};

export type CartType = {
  items: CartItem[];
  totalPrice: number;
};

export type CartItemProps = {
  item: CartItem;
  onRemove: (product: CartItem) => void;
};

export type CartDrawerItemProps = Pick<CartItemProps, "onRemove"> & CartItem;
