import { screen } from "@testing-library/react";

import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: jest.fn(() => <div>Outlet</div>)
}));

describe("DashboardTabs", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should be rendered correctly", () => {
    renderWithProviders(<DashboardLayout />);

    const buttons = screen.getAllByRole("link");
    const outletElement = screen.getByText("Outlet");

    expect(buttons.length).toBe(3);
    expect(outletElement).toBeInTheDocument();
  });
});
