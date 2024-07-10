import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { OrderStatus } from "@/types/order.types";

export type OrderBadgeVariants =
  | "pending"
  | "success"
  | "danger"
  | "contained"
  | "info";

export type OrderStatusesValue =
  (typeof orderStatusesTranslationKeys)[OrderStatus];
