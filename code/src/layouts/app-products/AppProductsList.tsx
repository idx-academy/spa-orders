import Box from "@mui/material/Box";

import { useGetProductsQuery } from "@/store/api/productsApi";
import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";

import { Product } from "@/types/product.types";

import "@/layouts/app-products/AppProductsList.scss";

const AppProductsList = () => {
  const { data: products } = useGetProductsQuery();

  const renderProducts = (products: Product[]) => {
    return products.map((product) => (
      <Box className="spa-productsList__productContainer" key={product.id}>
        <img
          className="spa-productsList__img"
          src={product.image}
          alt={product.name}
        />
        <Box>
          <AppTypography variant="caption">{product.name}</AppTypography>
          <AppTypography className="spa-productsList__price">
            {product.price}
          </AppTypography>
        </Box>
      </Box>
    ));
  };

  return (
    <PageWrapper className="spa-productsList">
      <AppTypography
        className="spa-productsList__header"
        translationKey="appProductsList.header"
        variant="h3"
      />

      <Box className="spa-productsList__container">
        {products && renderProducts(products)}
      </Box>
    </PageWrapper>
  );
};

export default AppProductsList;
