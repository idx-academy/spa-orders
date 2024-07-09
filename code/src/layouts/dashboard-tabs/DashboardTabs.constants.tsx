import { ReactNode } from "react";

import PeopleIcon from "@mui/icons-material/People";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import StorefrontIcon from "@mui/icons-material/Storefront";

import OrdersTab from "@/layouts/dashboard-tabs/components/orders-tab/OrdersTab";
import ProductsTab from "@/layouts/dashboard-tabs/components/products-tab/ProductsTab";
import UsersTab from "@/layouts/dashboard-tabs/components/users-tab/UsersTab";

export type DashboardTabName = "users" | "orders" | "products";

type DashboardTab = {
  labelTranslationKey: string;
  name: DashboardTabName;
  icon: ReactNode;
  content: ReactNode;
};

export const dashboardTabs: DashboardTab[] = [
  {
    labelTranslationKey: "dashboardTabs.users.label",
    name: "users",
    icon: <PeopleIcon />,
    content: <UsersTab />
  },
  {
    labelTranslationKey: "dashboardTabs.orders.label",
    name: "orders",
    icon: <ReceiptLongIcon />,
    content: <OrdersTab />
  },
  {
    labelTranslationKey: "dashboardTabs.products.label",
    name: "products",
    icon: <StorefrontIcon />,
    content: <ProductsTab />
  }
];
