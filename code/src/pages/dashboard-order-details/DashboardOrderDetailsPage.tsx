import { useParams } from "react-router-dom";

import OrderItem from "@/containers/order-item/OrderItem";

import AppLoader from "@/components/app-loader/AppLoader";

import { useLocaleContext } from "@/context/i18n/I18nProvider";
import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { dashboardOrderDetailsPageErrorConfig } from "@/pages/dashboard-order-details/DashboardOrderDetails.constants";
import { useGetAdminOrderByIdQuery } from "@/store/api/ordersApi";
import { OrderId } from "@/types/order.types";

import "@/pages/dashboard-order-details/DashboardOrderDetailsPage.scss";

type DashboardOrderDetailsPageParams = {
  orderId: OrderId;
};

const DashboardOrderDetailsPage = () => {
  const { orderId } = useParams<DashboardOrderDetailsPageParams>();
  const { locale: lang } = useLocaleContext();
  const { renderRedirectComponent } = useErrorPageRedirect();

  if (!orderId) {
    return renderRedirectComponent(dashboardOrderDetailsPageErrorConfig);
  }

  const { data: orderData, isLoading } = useGetAdminOrderByIdQuery({
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

  if (!orderData) {
    return renderRedirectComponent(dashboardOrderDetailsPageErrorConfig);
  }

  return <OrderItem isExpanded order={orderData} />;
};

export default DashboardOrderDetailsPage;
