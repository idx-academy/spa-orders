import AddIcon from "@mui/icons-material/Add";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import ProductsTable from "@/containers/tables/products-table/ProductsTable";
import { mockProducts } from "@/containers/tables/products-table/ProductsTable.constants";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

import routePaths from "@/constants/routes";

const DashboardProductsPage = () => {
  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-tabs__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.products.label"
        />
        <AppButton
          variant="contained"
          to={routePaths.dashboard.products.new.path}
        >
          <AddIcon />
          <AppTypography translationKey="dashboardTabs.addProduct.label" />
        </AppButton>
      </AppBox>
      <ProductsTable products={mockProducts} />
    </DashboardTabContainer>
  );
};

export default DashboardProductsPage;
