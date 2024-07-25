import { useSearchParams } from "react-router-dom";

import { defaultAdminOrderFilters } from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders.constants";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { SortOrder } from "@/types/common";
import timeSpanToDateRange from "@/utils/time-span-to-date-range/timeSpanToDateRange";

const useFilteredAdminOrders = () => {
  const { locale } = useLocaleContext();
  const {
    filters,
    appliedFilters: { paid, price, statuses, timespan, ...rest },
    activeFiltersCount,
    actions: filterActions
  } = useFiltersWithApply(defaultAdminOrderFilters);

  const dateRange = timespan ? timeSpanToDateRange(timespan) : undefined;

  const deliveryMethods =
    rest["delivery-methods"] && Array.from(rest["delivery-methods"]);

  const [searchParams] = useSearchParams();

  const sortParam = searchParams.get("sort") as SortOrder | null;

  const { data: ordersResponse, isLoading } = useGetAdminOrdersQuery({
    lang: locale,
    isPaid: paid,
    totalLess: price?.end,
    totalMore: price?.start,
    statuses: statuses && Array.from(statuses),
    deliveryMethods,
    createdBefore: dateRange?.end.toISOString(),
    createdAfter: dateRange?.start.toISOString(),
    sort: sortParam ?? undefined
  });

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
