import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import AppBox from "@/components/app-box/AppBox";
import AppTypography from "@/components/app-typography/AppTypography";

const DashboardNewProductPage = () => {
  return (
    <DashboardTabContainer>
      <AppBox className="dashboard-tabs__toolbar">
        <AppTypography
          component="h1"
          variant="h3"
          translationKey="dashboardTabs.addProduct.label"
        />
      </AppBox>
    </DashboardTabContainer>
  );
};

export default DashboardNewProductPage;
