import Box from "@mui/material/Box";

import { useGetProductsQuery } from "@/store/api/productsApi";
import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import AppTypography from "@/components/app-typography/AppTypography";

const AppProductsList = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();
  console.log(products);
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <PageWrapper>
      <AppTypography variant="h3">All Products</AppTypography>
      <Box>
        {products &&
          products.map((product) => (
            <Box key={product.id}>
              <img src={product.image} />

              <AppTypography>
                {product.name} - {product.price}
              </AppTypography>
            </Box>
          ))}
      </Box>
    </PageWrapper>
  );
};

export default AppProductsList;
