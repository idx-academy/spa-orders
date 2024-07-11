import TabContainer from "@/containers/dashboard-tabs/components//tab-container/TabContainer";
import OrdersTable from "@/containers/tables/orders-table/OrdersTable";

import AppTypography from "@/components/app-typography/AppTypography";

import { useGetAdminOrdersQuery } from "@/store/api/ordersApi";

const OrdersTab = () => {
  const { data: ordersResponse, isLoading } = useGetAdminOrdersQuery();

  if (isLoading) return <div>Loading...</div>;

  const orders = ordersResponse?.content ?? [];

  return (
    <TabContainer>
      <AppTypography
        component="h1"
        variant="h3"
        translationKey="dashboardTabs.orders.title"
      />
      <OrdersTable orders={orders} />
    </TabContainer>
  );
};

export default OrdersTab;
