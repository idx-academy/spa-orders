import AddIcon from "@mui/icons-material/Add";

import TabContainer from "@/containers/dashboard-tabs/components/tab-container/TabContainer";
import ProductsTable from "@/containers/tables/products-table/ProductsTable";
import { mockProducts } from "@/containers/tables/products-table/ProductsTable.constants";

import AppBox from "@/components/app-box/AppBox";
import AppButton from "@/components/app-button/AppButton";
import AppTypography from "@/components/app-typography/AppTypography";

const ProductsTab = () => {
  return (
    <TabContainer>
      <AppBox className="dashboard-tabs__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.products.label"
        />
        <AppButton variant="contained">
          <AddIcon />
          <AppTypography translationKey="dashboardTabs.addProduct.label" />
        </AppButton>
      </AppBox>
      <ProductsTable products={mockProducts} />
    </TabContainer>
  );
};

export default ProductsTab;
