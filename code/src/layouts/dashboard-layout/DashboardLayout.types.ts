import { ReactNode } from "react";

import { DASHBOARD_TAB_NAMES } from "@/layouts/dashboard-layout/DashboardLayout.constants";

import { ExtractValues } from "@/types/common";

export type DashboardTab = {
  labelTranslationKey: string;
  name: DashboardTabName;
  icon: ReactNode;
};

export type DashboardTabName = ExtractValues<typeof DASHBOARD_TAB_NAMES>;
