import { useParams } from "react-router-dom";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { updateProductPageNotFoundErrorConfig } from "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.constants";
import DashboardUpdateProductContainer from "@/pages/dashboard/dashboard-update-product/components/dashboard-update-product-container/DashboardUpdateProductContainer";
import isUuidValid from "@/utils/is-uuid-valid/isUUIDValid";

const DashboardUpdateProductPage = () => {
  const { productId } = useParams();

  const { renderRedirectComponent } = useErrorPageRedirect();

  if (!productId || !isUuidValid(productId)) {
    return renderRedirectComponent(updateProductPageNotFoundErrorConfig);
  }

  return (
    <DashboardTabContainer>
      <DashboardUpdateProductContainer productId={productId} />
    </DashboardTabContainer>
  );
};

export default DashboardUpdateProductPage;
