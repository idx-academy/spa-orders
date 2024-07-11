import { screen } from "@testing-library/react";

import ProductsTab from "@/containers/dashboard-tabs/components/products-tab/ProductsTab";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("ProductsTab", () => {
  test("renders correctly", () => {
    renderWithProviders(<ProductsTab />);

    const content = screen.getByText("ProductsTab");
    expect(content).toBeInTheDocument();
  });
});
