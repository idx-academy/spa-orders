import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import OrdersList from "@/containers/orders-list/OrdersList";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import { useGetOrdersQuery } from "@/store/api/ordersApi";

import "@/pages/orders/OrdersPage.scss";

const OrdersPage = () => {
  //@TODO: use id from slice
  const { data: orderResponse, isLoading } = useGetOrdersQuery({ id: "123" });

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const orders = orderResponse?.content ?? [];

  const pageTitleKey = orders.length
    ? "ordersPage.yourOrders"
    : "ordersPage.noOrders";

  const pageContent = (
    <>
      <AppTypography
        variant="h3"
        component="h1"
        translationKey={pageTitleKey}
      />
      {Boolean(orders.length) && <OrdersList orders={orders} />}
    </>
  );

  return (
    <PageWrapper>
      <AppBox className="spa-orders-page">{pageContent}</AppBox>
    </PageWrapper>
  );
};
export default OrdersPage;
