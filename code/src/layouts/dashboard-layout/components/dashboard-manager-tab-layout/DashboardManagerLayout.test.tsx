import { screen } from "@testing-library/react";

import DashboardManagerLayout from "@/layouts/dashboard-layout/components/dashboard-manager-tab-layout/DashboardManagerLayout";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>Outlet</div>
}));

describe("DashboardManagerLayout", () => {
  test("renders correctly", () => {
    renderWithProviders(<DashboardManagerLayout />);

    const outlet = screen.getByText("Outlet");
    expect(outlet).toBeInTheDocument();
  });
});
