import { useParams } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppTypography from "@/components/app-typography/AppTypography";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { productNotFoundRedirectConfig } from "@/pages/product-details/ProductsDetailsPage.constants";

type ProductDetailsPageParams = {
  productId: string;
};

const ProductDetailsPage = () => {
  const { productId } = useParams<ProductDetailsPageParams>();
  const { renderRedirectComponent } = useErrorPageRedirect();

  if (!productId) {
    return renderRedirectComponent(productNotFoundRedirectConfig);
  }

  return (
    <PageWrapper>
      <AppTypography>Product {productId}</AppTypography>
    </PageWrapper>
  );
};

export default ProductDetailsPage;
