import { Pageable, Sort } from "@/types/common";
import { PostAddress } from "@/types/delivery.types";
import { Product } from "@/types/product.types";
import { User, UserId } from "@/types/user.types";

export type OrderStatus =
  | "IN_PROGRESS"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED"
  | "COMPLETED";

export type OrderItem = {
  price: number;
  quantity: number;
  product: Product;
};

type Receiver = Pick<User, "email" | "firstName" | "lastName">;

type BaseOrder = {
  id: string;
  isPaid: boolean;
  total: number;
  orderStatus: OrderStatus;
  createdAt: string;
  receiver: Receiver;
  postAddress: PostAddress;
  orderItems: OrderItem[];
};

type BaseOrderResponse = {
  totalElements: number;
  totalPages: number;
  sort: Sort;
  first: boolean;
  last: boolean;
  number: number;
  pageable: Pageable;
  numberOfElements: number;
  size: number;
  empty: boolean;
};

//In the future, fields in the UserOrder and AdminOrder types may be different.
export type UserOrder = BaseOrder;

export type AdminOrder = BaseOrder;

export type UserOrderResponse = BaseOrderResponse & {
  content: UserOrder[];
};

export type AdminOrderResponse = BaseOrderResponse & {
  content: AdminOrder[];
};

export type OrderGetParams = { userId: UserId };
