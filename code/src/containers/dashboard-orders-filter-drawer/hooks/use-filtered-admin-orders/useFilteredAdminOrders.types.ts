import { RangeFilter } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";
import { TimeSpan } from "@/types/common";
import { DeliveryMethod } from "@/types/delivery.types";
import { OrderStatus } from "@/types/order.types";

export type AdminOrderFilters = {
  paid: boolean;
  statuses: Set<OrderStatus>;
  "delivery-methods": Set<DeliveryMethod>;
  timespan: "" | TimeSpan;
  price: RangeFilter<number>;
};

export type AdminOrderSearch = {
  accountEmail: string;
};
