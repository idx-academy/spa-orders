import { Outlet } from "react-router-dom";

import { dashboardAdminTabs } from "@/layouts/dashboard-layout/components/dashboard-admin-tab-layout/DashboardAdminLayout.constants";
import DashboardTabLayout from "@/layouts/dashboard-layout/components/dashboard-tab-layout/DashboardTabLayout";

import routes from "@/constants/routes";

const DashboardAdminLayout = () => {
  return (
    <DashboardTabLayout
      tabs={dashboardAdminTabs}
      activeTabPath={routes.dashboard.users.path}
    >
      <Outlet />
    </DashboardTabLayout>
  );
};

export default DashboardAdminLayout;
