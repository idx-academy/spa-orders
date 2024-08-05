import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import UpdateProductForm from "@/containers/forms/product-form/components/update-product-form/UpdateProductForm";
import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { updateProductPageNotFoundErrorConfig } from "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.constants";
import { DashboardUpdateProductPageProps } from "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.types";
import { useGetManagerProductQuery } from "@/store/api/productsApi";
import isErrorWithStatus from "@/utils/is-error-with-status/isErrorWithStatus";

import "@/pages/dashboard/dashboard-update-product/DashboardUpdateProductPage.scss";

const DashboardUpdateProductContainer = ({
  productId
}: DashboardUpdateProductPageProps) => {
  const {
    data: productData,
    isLoading,
    error
  } = useGetManagerProductQuery({ productId });

  const { renderRedirectComponent } = useErrorPageRedirect();

  if (isLoading) {
    return <PageLoadingFallback className="dashboard-tabs__loading-fallback" />;
  }

  const shouldShowNotFoundError =
    !productData && isErrorWithStatus(error) && error.status === 404;

  if (shouldShowNotFoundError) {
    return renderRedirectComponent(updateProductPageNotFoundErrorConfig);
  }

  if (!productData || error) {
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
      <UpdateProductForm product={productData} />
    </DashboardTabContainer>
  );
};

export default DashboardUpdateProductContainer;
