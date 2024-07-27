import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";

import { DASHBOARD_TAB_NAMES } from "@/layouts/dashboard-layout/DashboardLayout.constants";
import { DashboardTab } from "@/layouts/dashboard-layout/DashboardLayout.types";

export const dashboardManagerTabs: DashboardTab[] = [
  {
    labelTranslationKey: "dashboardTabs.orders.label",
    name: DASHBOARD_TAB_NAMES.ORDERS,
    icon: <ReceiptLongIcon />
  },
  {
    labelTranslationKey: "dashboardTabs.products.label",
    name: DASHBOARD_TAB_NAMES.PRODUCTS,
    icon: <StorefrontIcon />
  }
];
