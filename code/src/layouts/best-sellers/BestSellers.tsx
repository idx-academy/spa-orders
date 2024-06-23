import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";

import { useGetProductsQuery } from "@/store/api/productsApi";

import { Product } from "@/types/product.types";

import "@/layouts/best-sellers/BestSellers.scss";
import AppButton from "@/components/app-button/AppButton";
import AppLink from "@/components/app-link/AppLink";

const BestSellers = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const renderProducts = (products: Product[]) => {
    return products.slice(0, 5).map((product) => (
      <AppLink to="/">
        <AppBox
          className="spa-best-sellers__product-container"
          key={product.id}
        >
          <img
            className="spa-best-sellers__img"
            src={product.image}
            alt={product.name}
          />
          <AppBox>
            <AppTypography variant="caption">{product.name}</AppTypography>
            <AppTypography className="spa-best-sellers__price">
              {product.price}
            </AppTypography>
          </AppBox>
        </AppBox>
      </AppLink>
    ));
  };

  return (
    <PageWrapper className="spa-best-sellers">
      <AppTypography
        className="spa-best-sellers__header"
        translationKey="bestSellers.header"
        variant="h3"
      />

      <AppBox className="spa-best-sellers__container">
        {products && renderProducts(products)}
      </AppBox>
      <AppBox className="spa-best-sellers__button">
        <AppButton size="extra-large">View All</AppButton>
      </AppBox>
    </PageWrapper>
  );
};

export default BestSellers;
