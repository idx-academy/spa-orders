import { screen } from "@testing-library/react";

import DashboardProductsPage from "@/pages/dashboard/dashboard-products/DashboardProductsPage";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";
import { GetManagerProductsResponse } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/context/i18n/I18nProvider", () => ({
  ...jest.requireActual("@/context/i18n/I18nProvider"),
  useLocaleContext: () => ({ locale: "en" })
}));

jest.mock("@/store/api/productsApi", () => ({
  useGetManagerProductsQuery: jest.fn()
}));

type RenderAndMock = {
  isLoading: boolean;
  data: Partial<GetManagerProductsResponse>;
};

const renderAndMock = ({
  isLoading = false,
  data
}: Partial<RenderAndMock> = {}) => {
  (useGetManagerProductsQuery as jest.Mock).mockReturnValue({
    data,
    isLoading
  });

  renderWithProviders(<DashboardProductsPage />);
};

describe("DashboardProductsPage", () => {
  test("shows loading element initially", () => {
    renderAndMock({ isLoading: true });

    const loadingElement = screen.getByText("Loading...");
    expect(loadingElement).toBeInTheDocument();
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

    test("fetches data with initial params correctly", () => {
      expect(useGetManagerProductsQuery).toHaveBeenCalledWith({ lang: "en" });
    });
  });
});
