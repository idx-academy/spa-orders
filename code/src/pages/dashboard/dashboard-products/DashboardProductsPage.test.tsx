import { fireEvent, screen } from "@testing-library/react";

import DashboardProductsPage from "@/pages/dashboard/dashboard-products/DashboardProductsPage";
import { useGetManagerProductsQuery } from "@/store/api/productsApi";
import { GetManagerProductsResponse } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

jest.mock("@/store/api/productsApi", () => ({
  useGetManagerProductsQuery: jest.fn()
}));

type RenderAndMock = {
  isLoading: boolean;
  data: Partial<GetManagerProductsResponse>;
  error: Error | null;
  page: number;
};

const expectedQueryArgs = {
  page: 0,
  size: 8,
  lang: "en",
  sort: ["createdAt,desc"],
  searchByName: undefined
};

const renderAndMock = ({
  isLoading = false,
  data,
  error = null,
  page = 0
}: Partial<RenderAndMock> = {}) => {
  (useGetManagerProductsQuery as jest.Mock).mockReturnValue({
    data,
    isLoading,
    error
  });

  renderWithProviders(<DashboardProductsPage />, {
    initialEntries: [`/dashboard/products?page=${page}`]
  });
};

describe("DashboardProductsPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

    test("Should call useGetManagerProductsQuery with correct agrs", () => {
      renderAndMock();

      expect(useGetManagerProductsQuery).toHaveBeenCalledWith(
        expectedQueryArgs
      );
    });
  });

  describe("test pagination", () => {
    test("Should not render pagination when there is one page", () => {
      renderAndMock({
        data: { content: [], totalPages: 1 }
      });

      const pagination = screen.queryByTestId("pagination");
      expect(pagination).not.toBeInTheDocument();
    });

    test("Should render 7 pagination buttons when there is 5 pages", () => {
      renderAndMock({
        data: { content: [], totalPages: 5 }
      });

      const paginationButtons = screen.getAllByTestId("pagination-button");

      expect(paginationButtons).toHaveLength(7);
    });
  });

  describe("test searching", () => {
    test("Should call useGetManagerProductsQuery with correct search value after change", async () => {
      renderAndMock();

      const input = screen.getByPlaceholderText(
        "dashboardTabs.search.placeholder"
      );

      expect(input).toHaveValue("");

      await typeIntoInput(input, "new value");

      const submit = screen.getByLabelText("search");

      fireEvent.click(submit);

      expect(useGetManagerProductsQuery).toHaveBeenCalledWith({
        ...expectedQueryArgs,
        searchByName: "new value"
      });
    });
  });
});
