import { Pageable, Sort } from "@/types/common";
import { DeliveryMethod, PostAddress } from "@/types/delivery.types";
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

type OrderId = string;

type Receiver = Pick<User, "email" | "firstName" | "lastName">;

type BaseOrder = {
  id: OrderId;
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

export type OrderPostParams = PostAddress & {
  userId: UserId;
  firstName: string;
  lastName: string;
  email: string;
};

export type OrderPostResponse = {
  orderId: OrderId;
};

export type OrderPatchParams = {
  orderId: OrderId;
  orderStatus: OrderStatus;
};

export type GetUserOrderParams = {
  userId: UserId;
};

export type GetAdminOrderParams = Partial<
  Pick<BaseOrder, "isPaid"> & {
    sort?: string;
    deliveryMethods: DeliveryMethod[];
    statuses: OrderStatus[];
    totalMore: number;
    totalLess: number;
    createdBefore: string;
    createdAfter: string;
  }
>;
