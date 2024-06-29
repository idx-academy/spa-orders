import { Pageable, Sort } from "@/types/common";
import { orderStatuses } from "@/constants/orderStatuses";
import { Product } from "@/types/product.types";
import { PostAddress, Receiver } from "@/types/delivery.types";

export type OrderStatuses = keyof typeof orderStatuses;

export type OrderItem = {
  price: number;
  quantity: number;
  product: Product;
};

export type Order = {
  id: string;
  isPaid: boolean;
  orderStatus: OrderStatuses;
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
