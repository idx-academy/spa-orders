import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import OrdersList from "@/containers/orders-list/OrdersList";

import AppBox from "@/components/app-box/AppBox";
import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useGetUserDetails from "@/hooks/use-get-user-details/useGetUserDetails";
import { useGetUserOrdersQuery } from "@/store/api/ordersApi";

import "@/pages/orders/OrdersPage.scss";

const OrdersPage = () => {
  const { id } = useGetUserDetails();
  const { locale } = useLocaleContext();

  const {
    data: orderResponse,
    isLoading,
    error
  } = useGetUserOrdersQuery({
    userId: id,
    lang: locale
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
