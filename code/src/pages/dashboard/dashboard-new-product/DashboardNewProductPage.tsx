import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import NewProductForm from "@/containers/forms/new-product-form/NewProductForm";

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
        />
      </AppBox>
      <NewProductForm />
    </DashboardTabContainer>
  );
};

export default DashboardNewProductPage;
