import { screen } from "@testing-library/react";
import BestSellers from "@/layouts/best-sellers/BestSellers";
import { useGetProductsQuery } from "@/store/api/productsApi";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

import { mockData as mockItems } from "@/layouts/best-sellers/BestSellers.constants";

import { RTKQueryReturnState } from "@/types/common";

const mockData = {
  content: mockItems.slice(0, 5),
  totalPages: 5,
  totalItems: 20
};

jest.mock("@/store/api/productsApi", () => ({
  useGetProductsQuery: jest.fn()
}));

const defaultOptions: RTKQueryReturnState<typeof mockData> = {
  data: mockData,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: null
};

const renderAndMock = (
  extraOptions: Partial<RTKQueryReturnState<typeof mockData>> = {}
) => {
  (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
    ...defaultOptions,
    ...extraOptions
  });
  renderWithProviders(<BestSellers />);
};

describe("BestSellers component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render bestSellers header", () => {
    renderAndMock();

    const bestSellersHeader = screen.getByText(/bestSellers.header/i);

    expect(bestSellersHeader).toBeInTheDocument();
  });

  test("Should render product skeletons if isLoading", () => {
    renderAndMock({ isLoading: true });

    const productSkeletonElement = screen.getAllByTestId(
      "spa-product-skeleton"
    );

    expect(productSkeletonElement[0]).toBeInTheDocument();
  });

  test("Should render product cards when data is available", async () => {
    renderAndMock();

    const productCards = await screen.findAllByRole("link");
    expect(productCards.length).toBe(5);
  });

  test("Should render no product cards when data is empty", async () => {
    renderAndMock({ data: null });

    const productCards = screen.queryAllByRole("link");
    expect(productCards.length).toBe(0);
  });
});
