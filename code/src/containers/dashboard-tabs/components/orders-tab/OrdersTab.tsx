import FilterListIcon from "@mui/icons-material/FilterList";

import OrdersTabFilterDrawer from "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer";
import TabContainer from "@/containers/dashboard-tabs/components/tab-container/TabContainer";
import OrdersTable from "@/containers/tables/orders-table/OrdersTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";

import "@/containers/dashboard-tabs/components/orders-tab/OrdersTab.scss";

const OrdersTab = () => {
  const { data: ordersResponse, isLoading } = useGetAdminOrdersQuery();
  const { openDrawer } = useDrawerContext();

  if (isLoading) return <div>Loading...</div>;

  const orders = ordersResponse?.content ?? [];

  // @TODO: implement filtersCount
  const filtersCount = 2;

  const filtersTitleTranslationProps = {
    values: {
      count: filtersCount
    }
  };

  const handleOpenFilterDrawer = () => {
    openDrawer(
      <OrdersTabFilterDrawer
        filtersTitleTranslationProps={filtersTitleTranslationProps}
      />
    );
  };

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
