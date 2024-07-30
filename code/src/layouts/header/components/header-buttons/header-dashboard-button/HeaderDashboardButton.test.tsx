import HeaderDashboardButton from "@/layouts/header/components/header-buttons/header-dashboard-button/HeaderDashboardButton";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("Test HeaderDashboardButton", () => {
  test("renders HeaderDashboardButton component", () => {
    const { getByTestId } = renderWithProviders(<HeaderDashboardButton />);
    const headerDashboardButton = getByTestId("header-dashboard-button");
    expect(headerDashboardButton).toBeInTheDocument();
  });
});
