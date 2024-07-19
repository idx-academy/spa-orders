import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { Prettify } from "@/types/common";
import { DeliveryMethod } from "@/types/delivery.types";
import { GetAdminOrderParams, OrderStatus } from "@/types/order.types";

export type OrderFilters = Pick<
  Required<GetAdminOrderParams>,
  "isPaid" | "createdBefore" | "createdAfter" | "totalLess" | "totalMore"
> & {
  statuses: Set<OrderStatus>;
  deliveryMethods: Set<DeliveryMethod>;
};

const useFilteredAdminOrders = () => {
  const {
    filters,
    appliedFilters,
    activeFiltersCount,
    actions: filterActions
  } = useFiltersWithApply<OrderFilters>({
    isPaid: false,
    totalMore: 0,
    totalLess: 20000,
    createdBefore: "",
    createdAfter: "",
    statuses: new Set(),
    deliveryMethods: new Set()
  });

  const transformedFilters: GetAdminOrderParams = {
    isPaid: appliedFilters.isPaid,
    totalLess: appliedFilters.totalLess,
    totalMore: appliedFilters.totalMore,
    statuses: appliedFilters.statuses && Array.from(appliedFilters.statuses),
    deliveryMethods:
      appliedFilters?.deliveryMethods &&
      Array.from(appliedFilters.deliveryMethods)
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
