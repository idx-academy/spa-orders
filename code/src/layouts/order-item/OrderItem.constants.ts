import { orderStatuses } from "@/constants/orderStatuses";

export const orderBadgeVariants = {
  [orderStatuses.IN_PROGRESS]: "pending",
  [orderStatuses.COMPLETED]: "success",
  [orderStatuses.CANCELED]: "danger",
  [orderStatuses.DELIVERED]: "contained",
  [orderStatuses.SHIPPED]: "info"
} as const;
