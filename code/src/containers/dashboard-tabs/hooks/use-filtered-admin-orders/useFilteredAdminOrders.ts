import { timeSpans } from "@/constants/timeSpans";
import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { RangeFilter } from "@/hooks/use-filters-with-apply/useFiltersWithApply.types";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { DeliveryMethod } from "@/types/delivery.types";
import { GetAdminOrderParams, OrderStatus } from "@/types/order.types";

export type TimeSpan = keyof typeof timeSpans;

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
    appliedFilters: { paid, price, statuses, ...rest },
    activeFiltersCount,
    actions: filterActions
  } = useFiltersWithApply<OrderFilters>({
    paid: false,
    price: { start: 0, end: 20000 },
    statuses: new Set(),
    "delivery-methods": new Set(),
    timespan: ""
  });

  const transformedFilters: GetAdminOrderParams = {
    isPaid: paid,
    totalLess: price?.end,
    totalMore: price?.start,
    statuses: statuses && Array.from(statuses),
    deliveryMethods:
      rest["delivery-methods"] && Array.from(rest["delivery-methods"])
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
