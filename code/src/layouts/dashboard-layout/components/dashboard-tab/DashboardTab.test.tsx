import { screen } from "@testing-library/react";

import {
  DashboardTabName,
  DashboardTab as DashboardTabType
} from "@/layouts/dashboard-layout/DashboardLayout.types";
import DashboardTab from "@/layouts/dashboard-layout/components/dashboard-tab/DashboardTab";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const testIds = {
  icon: "icon",
  labelButton: "dashboard-tab-label"
};

const tab: DashboardTabType = {
  name: "users" as DashboardTabName,
  icon: <svg data-testid={testIds.icon} />,
  labelTranslationKey: "translation.key"
};

const activeTabLabelClassName = "spa-link--active";

const renderWithActiveTab = (activeTab: string = "/") => {
  renderWithProviders(<DashboardTab tab={tab} />, {
    initialEntries: [activeTab]
  });
};

describe("DashboardTab", () => {
  test("renders the tab with icon and label", () => {
    renderWithActiveTab();

    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();

    const label = screen.getByText(tab.labelTranslationKey);
    expect(label).toBeInTheDocument();
  });

  test("applies the active class when isTabActive is true", () => {
    renderWithActiveTab(`/${tab.name}`);

    const tabLabel = screen.getByTestId(testIds.labelButton);
    expect(tabLabel).toHaveClass(activeTabLabelClassName);
  });

  test("not applies the active class when isTabActive is false", () => {
    renderWithActiveTab();

    const tabLabel = screen.getByTestId(testIds.labelButton);
    expect(tabLabel).not.toHaveClass(activeTabLabelClassName);
  });
});
