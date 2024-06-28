import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import ProductCard from "@/components/product-card/ProductCard";

import { useGetProductsQuery } from "@/store/api/productsApi";

import "@/layouts/best-sellers/BestSellers.scss";

const BestSellers = () => {
  const { data: productsData, isLoading } = useGetProductsQuery({
    itemsPerPage: 5
  });

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const productCards =
    Boolean(productsData?.items) &&
    productsData?.items.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <PageWrapper className="spa-best-sellers">
      <AppTypography
        className="spa-best-sellers__header"
        translationKey="bestSellers.header"
        variant="h3"
      />
      <AppBox className="spa-best-sellers__container">{productCards}</AppBox>
      <AppBox className="spa-best-sellers__button">
        <AppButton size="extra-large">
          <AppTypography translationKey="bestSellers.button" />
        </AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default BestSellers;
