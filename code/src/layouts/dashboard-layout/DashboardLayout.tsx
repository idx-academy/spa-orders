import getLayoutByRole from "@/layouts/dashboard-layout/utils/getDashboardLayoutByRole";

import { useUserRoleSelector } from "@/store/slices/userSlice";

import "@/layouts/dashboard-layout/components/dashboard-tab-layout/DashboardTabLayout.scss";

const DashboardLayout = () => {
  const userRole = useUserRoleSelector();

  return getLayoutByRole(userRole);
};

export default DashboardLayout;
