import { useParams } from "react-router-dom";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { updateProductPageNotFoundErrorConfig } from "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.constants";
import { useGetManagerProductQuery } from "@/store/api/productsApi";
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";
import isUuidValid from "@/utils/is-uuid-valid/isUUIDValid";

import "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.scss";

const DashboardUpdateProductPage = () => {
  const { productId } = useParams();

  const { renderRedirectComponent } = useErrorPageRedirect();

  if (!productId || !isUuidValid(productId)) {
    return renderRedirectComponent(updateProductPageNotFoundErrorConfig);
  }

  const { data, isLoading, error } = useGetManagerProductQuery({ productId });

  if (isLoading) {
    return <PageLoadingFallback className="dashboard-tabs__loading-fallback" />;
  }

  const shouldShowNotFoundError =
    !data && isErrorWithStatus(error) && error.status === 404;

  if (shouldShowNotFoundError) {
    return renderRedirectComponent(updateProductPageNotFoundErrorConfig);
  }

  if (error) {
    return <AppTypography translationKey="errors.somethingWentWrong" />;
  }

  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-products-tab__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="product.update.title"
        />
      </AppBox>
      {data?.id}
    </DashboardTabContainer>
  );
};

export default DashboardUpdateProductPage;
