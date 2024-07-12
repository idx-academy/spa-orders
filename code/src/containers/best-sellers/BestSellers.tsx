import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import ProductsContainer from "@/containers/products-container/ProductsContainer";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import routes from "@/constants/routes";
import { useGetProductsQuery } from "@/store/api/productsApi";

import "@/containers/best-sellers/BestSellers.scss";

const BestSellers = () => {
  const {
    data: productsResponse,
    isLoading,
    isError
  } = useGetProductsQuery({
    page: 0,
    size: 5
  });

  return (
    <PageWrapper className="spa-best-sellers" data-cy="best-sellers">
      <AppTypography
        className="spa-best-sellers__header"
        translationKey="bestSellers.header"
        variant="h3"
      />
      <ProductsContainer
        isLoading={isLoading}
        isError={isError}
        products={productsResponse?.content ?? []}
      />
      <AppBox className="spa-best-sellers__button">
        <AppButton
          to={routes.products.path}
          size="extra-large"
          data-cy="best-sellers-button"
        >
          <AppTypography translationKey="bestSellers.button" />
        </AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default BestSellers;
