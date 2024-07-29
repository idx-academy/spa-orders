import { screen } from "@testing-library/react";

import getDashboardLayoutByRole from "@/layouts/dashboard-layout/utils/getDashboardLayoutByRole";

import { ROLES } from "@/constants/common";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock(
  "@/layouts/dashboard-layout/components/dashboard-admin-tab-layout/DashboardAdminLayout",
  () => ({
    __esModule: true,
    default: () => <div>DashboardAdminLayout</div>
  })
);

jest.mock(
  "@/layouts/dashboard-layout/components/dashboard-manager-tab-layout/DashboardManagerLayout",
  () => ({
    __esModule: true,
    default: () => <div>DashboardManagerLayout</div>
  })
);

describe("getDashboardLayoutByRole", () => {
  test("returns false if userRole is not admin or shop manager", () => {
    const layout = getDashboardLayoutByRole(null);
    expect(layout).toBe(false);
  });

  test("renders shop manager layout correctly", () => {
    const layout = getDashboardLayoutByRole(ROLES.SHOP_MANAGER) as JSX.Element;
    renderWithProviders(layout);

    const dasboardManagerLayout = screen.getByText("DashboardManagerLayout");
    expect(dasboardManagerLayout).toBeInTheDocument();
  });

  test("renders admin layout correctly", () => {
    const layout = getDashboardLayoutByRole(ROLES.ADMIN) as JSX.Element;
    renderWithProviders(layout);

    const dashbaordAdminLayout = screen.getByText("DashboardAdminLayout");
    expect(dashbaordAdminLayout).toBeInTheDocument();
  });
});
