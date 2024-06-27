import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox";
import ProductCard from "@/components/product-card/ProductCard";
import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import { useGetProductsQuery } from "@/store/api/productsApi";

import "@/pages/products/ProductsPage.scss";

const ProductsPage = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  //@TODO Create Skeleton for product items
  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const productCards = products
    ? products
        .slice(0, 4)
        .map((product) => <ProductCard key={product.id} product={product} />)
    : null;

  return (
    <PageWrapper>
      <AppBox className="spa-products-page">
        <AppTypography
          variant="h3"
          className="spa-products-page__header"
          translationKey="productsAll.label"
          component="h1"
        />
        <AppBox className="spa-products-page__info">
          <AppTypography className="spa-products-page__count" component="span">
            {products?.length || 0}
            <AppTypography
              translationKey="productsItems.label"
              component="span"
            />
          </AppTypography>
          {/**@TODO Create dropdown for sort by */}
          <AppTypography className="spa-products-page__sort" component="span">
            Sort by: Recommended
          </AppTypography>
        </AppBox>
        <AppBox className="spa-products-page__grid">{productCards}</AppBox>
      </AppBox>
    </PageWrapper>
  );
};

export default ProductsPage;
