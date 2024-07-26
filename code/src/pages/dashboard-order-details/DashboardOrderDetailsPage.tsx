import { useParams } from "react-router-dom";

import OrderItem from "@/containers/order-item/OrderItem";

import AppLoader from "@/components/app-loader/AppLoader";
import AppTypography from "@/components/app-typography/AppTypography";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import { useGetAdminOrderByIdQuery } from "@/store/api/ordersApi";
import { OrderId } from "@/types/order.types";

import "@/pages/dashboard-order-details/DashboardOrderDetailsPage.scss";

type DashboardOrderDetailsPageParams = {
  orderId: OrderId;
};

const DashboardOrderDetailsPage = () => {
  const { orderId } = useParams<DashboardOrderDetailsPageParams>();
  const { locale: lang } = useLocaleContext();

  if (!orderId) {
    return (
      <AppTypography
        variant="h3"
        component="h1"
        textAlign="center"
        translationKey="errors.somethingWentWrong"
      />
    );
  }

  const {
    data: orderData,
    isLoading,
    isError
  } = useGetAdminOrderByIdQuery({
    orderId,
    lang
  });

  if (isLoading) {
    return (
      <AppLoader
        className="dashboard-order-details__loader"
        size="extra-large"
      />
    );
  }

  if (isError) {
    return (
      <AppTypography
        variant="h3"
        component="h1"
        textAlign="center"
        translationKey="errors.somethingWentWrong"
      />
    );
  }

  if (!orderData) {
    return (
      <AppTypography
        variant="h3"
        component="h1"
        textAlign="center"
        translationKey="ordersPage.noOrderFound"
      />
    );
  }

  return <OrderItem isExpanded={true} order={orderData} />;
};

export default DashboardOrderDetailsPage;
