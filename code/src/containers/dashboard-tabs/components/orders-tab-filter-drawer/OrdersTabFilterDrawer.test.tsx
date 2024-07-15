import { screen } from "@testing-library/react";

import OrdersTabFilterDrawer from "@/containers/dashboard-tabs/components/orders-tab-filter-drawer/OrdersTabFilterDrawer";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("OrdersTabFilterDrawer", () => {
  test("renders correctly", () => {
    renderWithProviders(
      <OrdersTabFilterDrawer
        filtersTitleTranslationProps={{ values: { count: 2 } }}
      />
    );

    const applyFiltersButton = screen.getByRole("button", {
      name: "dashboardTabs.orders.filters.applyFiltersButton"
    });
    expect(applyFiltersButton).toBeInTheDocument();
  });
});
