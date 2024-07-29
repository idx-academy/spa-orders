import { screen } from "@testing-library/react";

import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";

import { ROLES } from "@/constants/common";
import { useUserRoleSelector } from "@/store/slices/userSlice";
import { UserRole } from "@/types/user.types";
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

jest.mock("@/store/slices/userSlice", () => ({
  useUserRoleSelector: jest.fn()
}));

const renderAndMock = (role?: UserRole) => {
  (useUserRoleSelector as jest.Mock).mockReturnValue(role);
  return renderWithProviders(<DashboardLayout />);
};

describe("DashboardLayout", () => {
  test("renders null if userRole is not admin or shop manager", () => {
    const { container } = renderAndMock();
    expect(container).toBeEmptyDOMElement();
  });

  test("renders AdminLayout if userRole admin", () => {
    renderAndMock(ROLES.ADMIN);

    const adminLayout = screen.getByText("DashboardAdminLayout");
    expect(adminLayout).toBeInTheDocument();
  });

  test("renders ManagerLayout if userRole manager", () => {
    renderAndMock(ROLES.SHOP_MANAGER);

    const managerLayout = screen.getByText("DashboardManagerLayout");
    expect(managerLayout).toBeInTheDocument();
  });
});
