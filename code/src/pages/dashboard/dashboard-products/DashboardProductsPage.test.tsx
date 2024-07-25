import { screen } from "@testing-library/react";

import DashboardProductsPage from "@/pages/dashboard/dashboard-products/DashboardProductsPage";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";
import { GetManagerProductsResponse } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/productsApi", () => ({
  useGetManagerProductsQuery: jest.fn()
}));

type RenderAndMock = {
  isLoading: boolean;
  data: Partial<GetManagerProductsResponse>;
  error: Error | null;
};

const renderAndMock = ({
  isLoading = false,
  data,
  error = null
}: Partial<RenderAndMock> = {}) => {
  (useGetManagerProductsQuery as jest.Mock).mockReturnValue({
    data,
    isLoading,
    error
  });

  renderWithProviders(<DashboardProductsPage />);
};

describe("DashboardProductsPage", () => {
  test("shows loading element initially", () => {
    renderAndMock({ isLoading: true });

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
  });

  test("shows error element when error occured", () => {
    renderAndMock({ error: new Error("Some error") });

    const errorElement = screen.getByText(
      "Error occured! Please try again later!"
    );
    expect(errorElement).toBeInTheDocument();
  });

  test("shows empty table fallback when data is undefined", () => {
    renderAndMock({ data: undefined });

    const emptyTableFallback = screen.getByTestId("table-fallback");
    expect(emptyTableFallback).toBeInTheDocument();
  });

  describe("with default values", () => {
    beforeEach(() => {
      renderAndMock({ data: { content: [] } });
    });

    test("renders correctly", () => {
      const title = screen.getByText("dashboardTabs.products.label");
      const addProductButton = screen.getByText(
        "dashboardTabs.addProduct.label"
      );

      expect(title).toBeInTheDocument();
      expect(addProductButton).toBeInTheDocument();
    });
  });
});
