import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import { DASHBOARD_TAB_NAMES } from "@/layouts/dashboard-layout/DashboardLayout.constants";
import { DashboardTab } from "@/layouts/dashboard-layout/DashboardLayout.types";

export const dashboardAdminTabs: DashboardTab[] = [
  {
    labelTranslationKey: "dashboardTabs.users.label",
    name: DASHBOARD_TAB_NAMES.USERS,
    icon: <PeopleIcon />
  },
  {
    labelTranslationKey: "dashboardTabs.orders.label",
    name: DASHBOARD_TAB_NAMES.ORDERS,
    icon: <ReceiptLongIcon />
  }
];
