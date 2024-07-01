import { Pageable, Sort } from "@/types/common";
import { orderStatuses } from "@/constants/orderStatuses";
import { Product } from "@/types/product.types";
import { PostAddress } from "@/types/delivery.types";
import { User } from "@/types/user.types";

export type OrderStatus = keyof typeof orderStatuses;

export type OrderItem = {
  price: number;
  quantity: number;
  product: Product;
};

type Receiver = Pick<User, "email" | "firstName" | "lastName">;

export type Order = {
  id: string;
  isPaid: boolean;
  orderStatus: OrderStatus;
  createdAt: string;
  receiver: Receiver;
  postAddress: PostAddress;
  orderItems: OrderItem[];
};

export type OrderResponse = {
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
  content: Order[];
};

export type OrderRequest = { id: string };
