import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { DeliveryMethod } from "@/types/delivery.types";
import { GetAdminOrderParams, OrderStatus } from "@/types/order.types";

type RangeFilter<T> = {
  start: T;
  end: T;
};

export type OrderFilters = Pick<
  Required<GetAdminOrderParams>,
  "isPaid" | "createdBefore" | "createdAfter"
> & {
  statuses: Set<OrderStatus>;
  deliveryMethods: Set<DeliveryMethod>;
  price: RangeFilter<number>;
};

const useFilteredAdminOrders = () => {
  const {
    filters,
    appliedFilters: { isPaid, price, statuses, deliveryMethods },
    activeFiltersCount,
    actions: filterActions
  } = useFiltersWithApply<OrderFilters>({
    isPaid: false,
    price: { start: 0, end: 20000 },
    createdBefore: "",
    createdAfter: "",
    statuses: new Set(),
    deliveryMethods: new Set()
  });

  const transformedFilters: GetAdminOrderParams = {
    isPaid: isPaid,
    totalLess: price?.end,
    totalMore: price?.start,
    statuses: statuses && Array.from(statuses),
    deliveryMethods: deliveryMethods && Array.from(deliveryMethods)
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
