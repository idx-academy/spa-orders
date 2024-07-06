import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";
import ProductCard from "@/components/product-card/ProductCard";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

import { useGetProductsQuery } from "@/store/api/productsApi";
import { Product } from "@/types/product.types";
import repeatComponent from "@/utils/repeat-component/repeatComponent";

import "@/layouts/best-sellers/BestSellers.scss";

const BestSellers = () => {
  const { data: productsResponse, isLoading } = useGetProductsQuery({
    page: 0,
    size: 5
  });

  const skeletonCards = repeatComponent(
    <ProductSkeleton />,
    productsResponse?.content?.length || 5
  );

  const productCards = productsResponse?.content?.map((product: Product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return (
    <PageWrapper className="spa-best-sellers">
      <AppTypography
        className="spa-best-sellers__header"
        translationKey="bestSellers.header"
        variant="h3"
      />
      <AppBox className="spa-best-sellers__container">
        {isLoading ? skeletonCards : productCards}
      </AppBox>
      <AppBox className="spa-best-sellers__button">
        <AppButton size="extra-large">
          <AppTypography translationKey="bestSellers.button" />
        </AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default BestSellers;
