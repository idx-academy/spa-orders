import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import CreateProductForm from "@/containers/forms/product-form/components/create-product-form/CreateProductForm";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

import "@/pages/dashboard/dashboard-new-product/DashboardNewProductPage.scss";

const DashboardNewProductPage = () => {
  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-tabs__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboard.products.title"
          data-cy="dashboard-new-product-title"
        />
      </AppBox>
      <CreateProductForm />
    </DashboardTabContainer>
  );
};

export default DashboardNewProductPage;
