import {
  AdminOrderFilters,
  AdminOrderSearch
} from "@/containers/dashboard-orders-filter-drawer/hooks/use-filtered-admin-orders/useFilteredAdminOrders.types";

// used key with dashes or shorted names to make output in url shorter and prettier
export const defaultAdminOrderFilters: AdminOrderFilters = {
  paid: false,
  price: { start: 0, end: 1_000_000 },
  statuses: new Set(),
  "delivery-methods": new Set(),
  timespan: ""
};

export const defaultSearchOrderFilter: AdminOrderSearch = {
  accountEmail: ""
};
