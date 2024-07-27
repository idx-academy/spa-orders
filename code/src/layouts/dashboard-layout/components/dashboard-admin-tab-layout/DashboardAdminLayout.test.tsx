import { screen } from "@testing-library/react";

import DashboardAdminLayout from "@/layouts/dashboard-layout/components/dashboard-admin-tab-layout/DashboardAdminLayout";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div>Outlet</div>
}));

describe("DashboardAdminLayout", () => {
  test("renders correctly", () => {
    renderWithProviders(<DashboardAdminLayout />);

    const outlet = screen.getByText("Outlet");
    expect(outlet).toBeInTheDocument();
  });
});
