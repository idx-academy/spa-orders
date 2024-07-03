import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import ProductCard from "@/components/product-card/ProductCard";

import { Product } from "@/types/product.types";
import { useGetProductsQuery } from "@/store/api/productsApi";

import "@/layouts/best-sellers/BestSellers.scss";

const BestSellers = () => {
  const { data: productsResponse, isLoading } = useGetProductsQuery({
    page: 0,
    size: 5
  });

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const products = productsResponse?.content ?? [];

  const productCards = products.map((product: Product) => (
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
