import { Lang, Pageable, Sort, SortOrder } from "@/types/common";
import { DeliveryMethod, PostAddress } from "@/types/delivery.types";
import { Product } from "@/types/product.types";
import { User, UserId } from "@/types/user.types";

export type OrderStatus =
  | "IN_PROGRESS"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELED"
  | "COMPLETED";

export type OrderIsPaid = boolean;

export type OrderItem = {
  price: number;
  quantity: number;
  product: Product;
};

export type OrderId = string;

type Receiver = Pick<User, "email" | "firstName" | "lastName">;

type BaseOrder = {
  id: OrderId;
  isPaid: OrderIsPaid;
  total: number;
  orderStatus: OrderStatus;
  availableStatuses: OrderStatus[];
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
  totalPages: number;
  totalItems: number;
};

export type GetAdminOrderByIdResponse = AdminOrder;

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
  isPaid?: boolean;
};

export type GetUserOrderParams = Lang & {
  userId: UserId;
  page?: number;
  size?: number;
};

export type GetAdminOrderByIdParams = Lang & {
  orderId: OrderId;
};

export type GetAdminOrderParams = Partial<
  Lang & { sort: SortOrder } & Pick<BaseOrder, "isPaid"> & {
      deliveryMethods: DeliveryMethod[];
      statuses: OrderStatus[];
      totalMore: number;
      totalLess: number;
      createdBefore: string;
      createdAfter: string;
      page?: number;
      size?: number;
    }
>;
