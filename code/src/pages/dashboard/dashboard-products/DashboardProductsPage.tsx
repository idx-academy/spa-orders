import AddIcon from "@mui/icons-material/Add";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import ProductsTable from "@/containers/tables/products-table/ProductsTable";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import routePaths from "@/constants/routes";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";

import "@/pages/dashboard/dashboard-products/DashboardProductsPage.scss";

const DashboardProductsPage = () => {
  const { data, isLoading, error } = useGetManagerProductsQuery({});

  // @TODO: replace with actual loading fallback
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // @TODO: replace with actual error fallback
  if (error) {
    return <div>Error occured! Please try again later!</div>;
  }

  const products = data?.content ?? [];

  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-products-tab__toolbar" data-cy="dashboard-products-tab-content">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.products.label"
        />
        <AppButton
          data-cy="new-product-button"
          variant="contained"
          to={routePaths.dashboard.products.new.path}
        >
          <AddIcon />
          <AppTypography translationKey="dashboardTabs.addProduct.label" />
        </AppButton>
      </AppBox>
      <ProductsTable products={products} />
    </DashboardTabContainer>
  );
};

export default DashboardProductsPage;
