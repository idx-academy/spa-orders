import DashboardAdminLayout from "@/layouts/dashboard-layout/components/dashboard-admin-tab-layout/DashboardAdminLayout";
import DashboardManagerLayout from "@/layouts/dashboard-layout/components/dashboard-manager-tab-layout/DashboardManagerLayout";

import { ROLES } from "@/constants/common";
import { useUserRoleSelector } from "@/store/slices/userSlice";

import "@/layouts/dashboard-layout/components/dashboard-tab-layout/DashboardTabLayout.scss";

const DashboardLayout = () => {
  const userRole = useUserRoleSelector();

  if (userRole === ROLES.ADMIN) {
    return <DashboardAdminLayout />;
  }

  if (userRole === ROLES.SHOP_MANAGER) {
    return <DashboardManagerLayout />;
  }

  return null;
};

export default DashboardLayout;
