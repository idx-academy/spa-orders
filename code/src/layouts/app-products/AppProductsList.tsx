import Box from "@mui/material/Box";

import { useGetProductsQuery } from "@/store/api/productsApi";
import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/layouts/app-products/AppProductsList.scss";

const AppProductsList = () => {
  const { data: products } = useGetProductsQuery();

  return (
    <PageWrapper className="spa-productList">
      <AppTypography className="spa-productList__header" variant="h3">
        All Products
      </AppTypography>
      <Box className="spa-productList__container">
        {products &&
          products.map((product) => (
            <Box className="spa-productList__productContainer" key={product.id}>
              <img className="spa-productList__img" src={product.image} />
              <AppTypography>{product.name}</AppTypography>
              <AppTypography className="spa-productList__price">
                {product.price}
              </AppTypography>
            </Box>
          ))}
      </Box>
    </PageWrapper>
  );
};

export default AppProductsList;
