import { screen } from "@testing-library/react";

import DashboardTabContainer from "@/layouts/dashboard-layout/components/dashboard-tab-container/DashboardTabContainer";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("TabContainer", () => {
  test("renders with children", () => {
    renderWithProviders(
      <DashboardTabContainer>
        <div>children</div>
      </DashboardTabContainer>
    );

    const children = screen.getByText(/children/);
    expect(children).toBeInTheDocument();
  });
});
