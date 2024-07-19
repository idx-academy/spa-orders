import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { RangeFilter } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { TimeSpan } from "@/types/common";
import { DeliveryMethod } from "@/types/delivery.types";
import { GetAdminOrderParams, OrderStatus } from "@/types/order.types";
import timeSpanToDateRange from "@/utils/time-span-to-date-range/timeSpanToDateRange";

export type OrderFilters = {
  paid: boolean;
  statuses: Set<OrderStatus>;
  "delivery-methods": Set<DeliveryMethod>;
  timespan: "" | TimeSpan;
  price: RangeFilter<number>;
};

const useFilteredAdminOrders = () => {
  const {
    filters,
    appliedFilters: { paid, price, statuses, timespan, ...rest },
    activeFiltersCount,
    actions: filterActions
  } = useFiltersWithApply<OrderFilters>({
    paid: false,
    price: { start: 0, end: 20000 },
    statuses: new Set(),
    "delivery-methods": new Set(),
    timespan: ""
  });

  const dateRange = timespan ? timeSpanToDateRange(timespan) : undefined;

  const transformedFilters: GetAdminOrderParams = {
    isPaid: paid,
    totalLess: price?.end,
    totalMore: price?.start,
    statuses: statuses && Array.from(statuses),
    deliveryMethods:
      rest["delivery-methods"] && Array.from(rest["delivery-methods"]),
    createdBefore: dateRange?.end.toJSON(),
    createdAfter: dateRange?.start.toJSON()
  };

  const { data: ordersResponse, isLoading } =
    useGetAdminOrdersQuery(transformedFilters);

  const orders = ordersResponse?.content ?? [];

  return {
    filters,
    filterActions,
    activeFiltersCount,
    orders,
    isLoading
  } as const;
};

export default useFilteredAdminOrders;
