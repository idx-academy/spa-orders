import { Outlet } from "react-router-dom";

import { dashboardManagerTabs } from "@/layouts/dashboard-layout/components/dashboard-manager-tab-layout/DashboardManagerLayout.constants";
import DashboardTabLayout from "@/layouts/dashboard-layout/components/dashboard-tab-layout/DashboardTabLayout";

import routes from "@/constants/routes";

const DashboardManagerLayout = () => {
  return (
    <DashboardTabLayout
      tabs={dashboardManagerTabs}
      activeTabPath={routes.dashboard.orders.path}
    >
      <Outlet />
    </DashboardTabLayout>
  );
};

export default DashboardManagerLayout;
