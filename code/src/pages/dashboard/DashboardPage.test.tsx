import { screen } from "@testing-library/react";

import DashboardPage from "@/pages/dashboard/DashboardPage";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/containers/dashboard-tabs/DashboardTabs", () => ({
  __esModule: true,
  default: () => <div>DashboardTabs</div>
}));

describe("DashboardPage", () => {
  test("renders correctly", () => {
    renderWithProviders(<DashboardPage />);

    const content = screen.getByText("DashboardTabs");
    expect(content).toBeInTheDocument();
  });
});
