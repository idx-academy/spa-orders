import { render, screen } from "@testing-library/react";

import HeaderShopManagerToolbar from "@/layouts/header/components/header-toolbar/header-shop-manager-toolbar/HeaderShopManagerToolbar";

jest.mock(
  "@/layouts/header/components/header-buttons/header-dashboard-button/HeaderDashboardButton",
  () => ({
    __esModule: true,
    default: () => <div>Dashboard Button</div>
  })
);
jest.mock(
  "@/layouts/header/components/header-buttons/header-logout-button/HeaderLogoutButton",
  () => ({
    __esModule: true,
    default: () => <div>Logout Button</div>
  })
);

describe("HeaderShopManagerToolbar", () => {
  it("should render the dashboard button and logout button", () => {
    render(<HeaderShopManagerToolbar />);

    const dashboardButton = screen.getByText("Dashboard Button");
    const logoutButton = screen.getByText("Logout Button");

    expect(dashboardButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
  });
});
