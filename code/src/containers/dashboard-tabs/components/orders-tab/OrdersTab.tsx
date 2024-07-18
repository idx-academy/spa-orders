import FilterListIcon from "@mui/icons-material/FilterList";

import OrdersTabFilterDrawer from "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer";
import TabContainer from "@/containers/dashboard-tabs/components/tab-container/TabContainer";
import OrdersTable from "@/containers/tables/orders-table/OrdersTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import useFiltersWithApply from "@/hooks/use-filters-with-apply/useFiltersWithApply";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";
import { GetAdminOrderParams } from "@/types/order.types";

import "@/containers/dashboard-tabs/components/orders-tab/OrdersTab.scss";

export type OrderFilters = Pick<
  GetAdminOrderParams,
  "isPaid" | "createdBefore" | "createdAfter" | "totalLess" | "totalMore"
>;

const OrdersTab = () => {
  const { filters, appliedFilters, activeFiltersCount, actions } =
    useFiltersWithApply<OrderFilters>({
      isPaid: false,
      totalMore: 0,
      totalLess: 20000,
      createdBefore: "",
      createdAfter: ""
    });

  const { data: ordersResponse, isLoading } =
    useGetAdminOrdersQuery(appliedFilters);

  const { openDrawer } = useDrawerContext();

  if (isLoading) return <div>Loading...</div>;

  const handleOpenFilterDrawer = () => {
    openDrawer(
      <OrdersTabFilterDrawer
        filtersTitleTranslationProps={filtersTitleTranslationProps}
        filters={filters}
        filterActions={actions}
      />
    );
  };

  const filtersTitleTranslationProps = {
    values: {
      count: activeFiltersCount
    }
  };

  const orders = ordersResponse?.content ?? [];

  return (
    <TabContainer>
      <AppBox className="dashboard-tabs__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.orders.title"
        />
        <AppButton variant="dark" onClick={handleOpenFilterDrawer}>
          <AppTypography
            translationKey="dashboardTabs.orders.filters.title"
            translationProps={filtersTitleTranslationProps}
          />
          <FilterListIcon />
        </AppButton>
      </AppBox>
      <OrdersTable orders={orders} />
    </TabContainer>
  );
};

export default OrdersTab;
