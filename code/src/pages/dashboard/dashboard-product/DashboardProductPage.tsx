import { useParams } from "react-router-dom";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { dashboardProductPageNotFoundErrorConfig } from "@/pages/dashboard/dashboard-product/DashboardProductPage.constants";
import DashboardProductContainer from "@/pages/dashboard/dashboard-product/components/dashboard-product-container/DashboardProductContainer";
import isUuidValid from "@/utils/is-uuid-valid/isUUIDValid";

const DashboardProductPage = () => {
  const { productId } = useParams();

  const { renderRedirectComponent } = useErrorPageRedirect();

  if (!productId || !isUuidValid(productId)) {
    return renderRedirectComponent(dashboardProductPageNotFoundErrorConfig);
  }

  return <DashboardProductContainer productId={productId} />;
};

export default DashboardProductPage;
