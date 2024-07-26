import { render, screen } from "@testing-library/react";

import DashboardNewProductPage from "@/pages/dashboard/dashboard-new-product/DashboardNewProductPage";

jest.mock("@/containers/forms/new-product-form/NewProductForm", () => ({
  __esModule: true,
  default: () => <div>NewProductForm</div>
}));

describe("Test DashboardNewProductPage", () => {
  test("should render DashboardNewProductPage", () => {
    render(<DashboardNewProductPage />);

    const pageTitleElement = screen.getByText("dashboard.products.title");
    const formElement = screen.getByText("NewProductForm");

    expect(pageTitleElement).toBeInTheDocument();
    expect(formElement).toBeInTheDocument();
  });
});
