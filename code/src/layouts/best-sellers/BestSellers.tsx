import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductsContainer from "@/components/products-container/ProductsContainer";

import { useGetProductsQuery } from "@/store/api/productsApi";

import "@/layouts/best-sellers/BestSellers.scss";

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
    <PageWrapper className="spa-best-sellers">
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
        <AppButton size="extra-large">
          <AppTypography translationKey="bestSellers.button" />
        </AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default BestSellers;
