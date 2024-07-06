import { orderStatuses } from "@/constants/orderStatuses";
import {
  OrderBadgeVariants,
  OrderStatusesValue
} from "@/layouts/order-item/OrderItems.types";

export const orderBadgeVariants: Record<
  OrderStatusesValue,
  OrderBadgeVariants
> = {
  [orderStatuses.IN_PROGRESS]: "pending",
  [orderStatuses.COMPLETED]: "success",
  [orderStatuses.CANCELED]: "danger",
  [orderStatuses.DELIVERED]: "contained",
  [orderStatuses.SHIPPED]: "info"
} as const;
