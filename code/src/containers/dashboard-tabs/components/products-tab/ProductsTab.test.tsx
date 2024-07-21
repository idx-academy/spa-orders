import { screen } from "@testing-library/react";

import ProductsTab from "@/containers/dashboard-tabs/components/products-tab/ProductsTab";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("ProductsTab", () => {
  test("renders correctly", () => {
    renderWithProviders(<ProductsTab />);

    const title = screen.getByText("dashboardTabs.products.label");
    const addProductButton = screen.getByText("dashboardTabs.addProduct.label");

    expect(title).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
  });
});
