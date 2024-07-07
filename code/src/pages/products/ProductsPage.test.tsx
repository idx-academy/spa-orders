import { fireEvent, screen } from "@testing-library/react";

import ProductsPage from "@/pages/products/ProductsPage";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { PaginationParams, RTKQueryReturnState } from "@/types/common";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/productsApi", () => ({
  useGetProductsQuery: jest.fn()
}));

const mockProducts = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 },
  { id: 5, name: "Product 5", price: 100 },
  { id: 6, name: "Product 6", price: 200 },
  { id: 7, name: "Product 7", price: 300 },
  { id: 8, name: "Product 8", price: 400 }
];

const mockData = { content: mockProducts, totalPages: 2, totalElements: 8 };

const defaultQueryArguments = {
  size: 10,
  page: 0,
  sort: ""
};

const testQueryArguments = (args: Partial<PaginationParams> = {}) => {
  expect(useGetProductsQuery).toHaveBeenCalledWith({
    ...defaultQueryArguments,
    ...args
  });
};

const renderAndMock = (
  {
    entries = "",
    mockResponse = {}
  }: {
    entries?: string;
    mockResponse?: Partial<RTKQueryReturnState<Partial<typeof mockData>>>;
  } = { entries: "", mockResponse: {} }
) => {
  (useGetProductsQuery as jest.Mock).mockReturnValue({
    isLoading: false,
    isError: false,
    isSuccess: true,
    error: null,
    ...mockResponse,
    data:
      "data" in mockResponse && !mockResponse.data
        ? mockResponse.data
        : { ...mockData, ...mockResponse.data }
  });

  return renderWithProviders(<ProductsPage />, { initialEntries: [entries] });
};

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the product count correctly", () => {
    renderAndMock();

    const productsCountElement = screen.getByText(mockProducts.length);

    expect(productsCountElement).toBeInTheDocument();
  });

  test("Should show skeletons while loading", () => {
    const { container } = renderAndMock({
      mockResponse: { isLoading: true, data: undefined }
    });

    const skeletons = container.getElementsByClassName("spa-product-skeleton");

    expect(skeletons.length).toBe(10);
  });

  test("Should apply selected sort criterai", () => {
    renderAndMock();

    const dropdownElement = screen.getByText(/sortBy.label/);

    fireEvent.click(dropdownElement);

    const dropdownItemElement = screen.getByText(/sortOptions.newest/);

    fireEvent.click(dropdownItemElement);

    testQueryArguments({ sort: "createdAt,desc" });
  });

  test("Should give substracted page", () => {
    renderAndMock({ entries: "?page=3" });

    testQueryArguments({ page: 2 });
  });

  test("Should give default parameters if no params were provided", () => {
    renderAndMock();

    testQueryArguments();
  });

  test("Should query 0 page if page search query is invalid", () => {
    renderAndMock({ entries: "?page=ah" });

    testQueryArguments({ page: 0 });
  });

  test("Should correctly apply sort criteria from search query", () => {
    renderAndMock({ entries: "?sort=price%2Casc" });

    testQueryArguments({ sort: "price,asc" });
  });

  test("Should not render pagination if there is only one page", () => {
    renderAndMock({
      mockResponse: {
        data: { totalPages: 1 }
      }
    });

    const linkElements = screen.getAllByRole("link");

    expect(linkElements.length).toBe(mockProducts.length);
  });

  test("Should render pagination if there are more than one page", () => {
    renderAndMock();

    const linkElements = screen.getAllByRole("link");

    expect(linkElements.length).toBe(mockProducts.length + 4);
  });

  test("Should apply default values for pageCount and productsCount if data is undefined", () => {
    renderAndMock({
      mockResponse: {
        data: undefined
      }
    });

    const productsCount = screen.getByText("0");
    const linksElemnts = screen.queryAllByRole("link");

    expect(productsCount).toBeInTheDocument();
    expect(linksElemnts.length).toBe(0);
  });
});
