import { useParams } from "react-router-dom";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import useErrorPageRedirect from "@/hooks/use-error-page-redirect/useErrorPageRedirect";
import { productNotFoundRedirectConfig } from "@/pages/product-details/ProductsDetailsPage.constants";
import ProductDetailsContainer from "@/pages/product-details/components/product-details-container/ProductDetailsContainer";

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
      <ProductDetailsContainer productId={productId} />
    </PageWrapper>
  );
};

export default ProductDetailsPage;
