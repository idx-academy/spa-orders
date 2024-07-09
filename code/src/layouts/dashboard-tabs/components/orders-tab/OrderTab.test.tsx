import { screen } from "@testing-library/react";

import OrdersTab from "@/layouts/dashboard-tabs/components/orders-tab/OrdersTab";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("OrderTab", () => {
  test("renders correctly", () => {
    renderWithProviders(<OrdersTab />);

    const content = screen.getByText("OrdersTab");
    expect(content).toBeInTheDocument();
  });
});
