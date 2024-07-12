import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import OrdersList from "@/containers/orders-list/OrdersList";

import AppBox from "@/components/app-box/AppBox";
import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";

import { useGetUserOrdersQuery } from "@/store/api/ordersApi";
import { useUserDetailsSelector } from "@/store/slices/userSlice";

import "@/pages/orders/OrdersPage.scss";

const OrdersPage = () => {
  const userDetails = useUserDetailsSelector();

  const {
    data: orderResponse,
    isLoading,
    error
  } = useGetUserOrdersQuery({
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    userId: userDetails?.id! //we are sure that userDetails is not null because we are using this page inside protected route
  });

  const orders = orderResponse?.content ?? [];

  const pageTitleKey = orders.length
    ? "ordersPage.yourOrders"
    : "ordersPage.noOrders";

  const renderPageContent = () => {
    if (isLoading) {
      return <AppLoader size="extra-large" />;
    }

    if (error) {
      return (
        <AppTypography
          variant="h3"
          component="h1"
          textAlign="center"
          translationKey="errors.somethingWentWrong"
        />
      );
    }

    return (
      <>
        <AppTypography
          variant="h3"
          component="h1"
          translationKey={pageTitleKey}
        />
        {Boolean(orders.length) && <OrdersList orders={orders} />}
      </>
    );
  };

  return (
    <PageWrapper>
      <AppBox className="spa-orders-page">{renderPageContent()}</AppBox>
    </PageWrapper>
  );
};
export default OrdersPage;
