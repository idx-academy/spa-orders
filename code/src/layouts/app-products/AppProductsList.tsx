import PageWrapper from "@/layouts/page-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";
import AppBox from "@/components/app-box/AppBox"

import { useGetProductsQuery } from "@/store/api/productsApi";

import { Product } from "@/types/product.types";

import "@/layouts/app-products/AppProductsList.scss";

const AppProductsList = () => {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) return <AppTypography>Loading...</AppTypography>;

  const renderProducts = (products: Product[]) => {
    return products.map((product) => (
      <AppBox className="spa-products-list__product-container" key={product.id}>
        <img
          className="spa-products-list__img"
          src={product.image}
          alt={product.name}
        />
        <AppBox>
          <AppTypography variant="caption">{product.name}</AppTypography>
          <AppTypography className="spa-products-list__price">
            {product.price}
          </AppTypography>
        </AppBox>
      </AppBox>
    ));
  };

  return (
    <PageWrapper className="spa-products-list">
      <AppTypography
        className="spa-products-list__header"
        translationKey="appProductsList.header"
        variant="h3"
      />

      <AppBox className="spa-products-list__container">
        {products && renderProducts(products)}
      </AppBox>
    </PageWrapper>
  );
};

export default AppProductsList;
