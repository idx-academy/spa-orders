import {
  OrderBadgeVariants,
  OrderStatusesValue
} from "@/containers/order-item/OrderItems.types";

import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";

export const orderBadgeVariants: Record<
  OrderStatusesValue,
  OrderBadgeVariants
> = {
  [orderStatusesTranslationKeys.IN_PROGRESS]: "pending",
  [orderStatusesTranslationKeys.COMPLETED]: "success",
  [orderStatusesTranslationKeys.CANCELED]: "danger",
  [orderStatusesTranslationKeys.DELIVERED]: "contained",
  [orderStatusesTranslationKeys.SHIPPED]: "info"
} as const;
