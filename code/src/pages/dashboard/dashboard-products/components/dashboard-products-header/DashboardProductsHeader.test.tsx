import { fireEvent, screen, waitFor } from "@testing-library/react";

import DashboardProductsHeader from "@/pages/dashboard/dashboard-products/components/dashboard-products-header/DashboardProductsHeader";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

const mockOnSearch = jest.fn();

const value = "test value";

describe("Test DashboardProductsHeader", () => {
  let input: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeEach(() => {
    renderWithProviders(<DashboardProductsHeader onSearch={mockOnSearch} />);

    input = screen.getByPlaceholderText("dashboardTabs.search.placeholder");
    submitButton = screen.getByLabelText("search");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should be rendered correctly", () => {
    const title = screen.getByText("dashboardTabs.products.label");
    const addProductButton = screen.getByText("dashboardTabs.addProduct.label");

    expect(title).toBeInTheDocument();
    expect(addProductButton).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("Should change value of input and call provided function with correct value", () => {
    typeIntoInput(input, value);

    expect(input).toHaveValue(value);

    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledWith(value);
  });

  test("Should clear input value", () => {
    typeIntoInput(input, value);

    expect(input).toHaveValue(value);

    const clearButton = screen.getByLabelText("clear");

    fireEvent.click(clearButton);

    waitFor(() => {
      expect(input).toHaveValue("");
    });
  });
});
