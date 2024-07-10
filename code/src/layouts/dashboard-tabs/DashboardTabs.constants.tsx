import { ReactNode } from "react";

import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";

import OrdersTab from "@/layouts/dashboard-tabs/components/orders-tab/OrdersTab";
import ProductsTab from "@/layouts/dashboard-tabs/components/products-tab/ProductsTab";
import UsersTab from "@/layouts/dashboard-tabs/components/users-tab/UsersTab";

import { ExtractValues } from "@/types/common";

export type DashboardTab = {
  labelTranslationKey: string;
  name: DashboardTabName;
  icon: ReactNode;
  content: ReactNode;
};

export const DASHBOARD_TAB_NAMES = {
  USERS: "users",
  ORDERS: "orders",
  PRODUCTS: "products"
} as const;

export type DashboardTabName = ExtractValues<typeof DASHBOARD_TAB_NAMES>;

export const dashboardTabs: DashboardTab[] = [
  {
    labelTranslationKey: "dashboardTabs.orders.label",
    name: DASHBOARD_TAB_NAMES.ORDERS,
    icon: <ReceiptLongIcon />,
    content: <OrdersTab />
  },
  {
    labelTranslationKey: "dashboardTabs.products.label",
    name: DASHBOARD_TAB_NAMES.PRODUCTS,
    icon: <StorefrontIcon />,
    content: <ProductsTab />
  },
  {
    labelTranslationKey: "dashboardTabs.users.label",
    name: DASHBOARD_TAB_NAMES.USERS,
    icon: <PeopleIcon />,
    content: <UsersTab />
  }
];
