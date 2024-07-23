import { screen } from "@testing-library/react";

import DashboardUsersPage from "@/pages/dashboard/dashboard-users/DashboardUsersPage";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("UsersTab", () => {
  test("renders correctly", () => {
    renderWithProviders(<DashboardUsersPage />);

    const content = screen.getByText("UsersTab");
    expect(content).toBeInTheDocument();
  });
});
