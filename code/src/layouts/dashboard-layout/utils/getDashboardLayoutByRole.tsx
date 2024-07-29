import DashboardAdminLayout from "@/layouts/dashboard-layout/components/dashboard-admin-tab-layout/DashboardAdminLayout";
import DashboardManagerLayout from "@/layouts/dashboard-layout/components/dashboard-manager-tab-layout/DashboardManagerLayout";

import { ROLES } from "@/constants/common";
import { UserRole } from "@/types/user.types";

const getDasboardLayoutByRole = (role: UserRole | null) => {
  switch (role) {
    case ROLES.ADMIN:
      return <DashboardAdminLayout />;
    case ROLES.SHOP_MANAGER:
      return <DashboardManagerLayout />;
    default:
      return false;
  }
};

export default getDasboardLayoutByRole;
