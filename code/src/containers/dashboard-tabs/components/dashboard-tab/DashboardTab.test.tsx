import { fireEvent, render, screen } from "@testing-library/react";

import {
  DashboardTabName,
  DashboardTab as DashboardTabType
} from "@/containers/dashboard-tabs/DashboardTabs.constants";
import DashboardTab from "@/containers/dashboard-tabs/components/dashboard-tab/DashboardTab";

const testIds = {
  icon: "icon",
  labelButton: "dashboard-tab-label"
};

const tab: DashboardTabType = {
  name: "users" as DashboardTabName,
  icon: <svg data-testid={testIds.icon} />,
  labelTranslationKey: "translation.key",
  content: <div></div>
};

const mockOnActive = jest.fn();
const activeTabLabelClassName = "dashboard-tabs__label-item--active";

const renderWithActiveState = (isActive: boolean) => {
  render(
    <DashboardTab tab={tab} onActive={mockOnActive} isTabActive={isActive} />
  );
};

describe("DashboardTab", () => {
  test("renders the tab with icon and label", () => {
    renderWithActiveState(false);

    const icon = screen.getByTestId("icon");
    expect(icon).toBeInTheDocument();

    const label = screen.getByText(tab.labelTranslationKey);
    expect(label).toBeInTheDocument();
  });

  test("applies the active class when isTabActive is true", () => {
    renderWithActiveState(true);

    const tabLabel = screen.getByTestId(testIds.labelButton);
    expect(tabLabel).toHaveClass(activeTabLabelClassName);
  });

  test("not applies the active class when isTabActive is false", () => {
    renderWithActiveState(false);

    const tabLabel = screen.getByTestId(testIds.labelButton);
    expect(tabLabel).not.toHaveClass(activeTabLabelClassName);
  });

  test("calls onActive with the correct tab name when clicked", () => {
    renderWithActiveState(false);

    const label = screen.getByText(tab.labelTranslationKey);
    fireEvent.click(label);
    expect(mockOnActive).toHaveBeenCalledWith(tab.name);
  });
});
