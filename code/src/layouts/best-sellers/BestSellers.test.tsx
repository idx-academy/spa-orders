import { screen } from "@testing-library/react";

import BestSellers from "@/layouts/best-sellers/BestSellers";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { renderWithProviders } from "@/utils/test-utils";

import { mockData as mockItems } from "@/layouts/best-sellers/BestSellers.constants";

const mockData = {
  items: mockItems.slice(0, 5),
  pagesCount: 5,
  itemsCount: 20
};

jest.mock("@/store/api/productsApi", () => ({
  useGetProductsQuery: jest.fn()
}));

describe("BestSellers component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should render bestSellers header", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    });
    renderWithProviders(<BestSellers />);
    const bestSellersHeader = screen.getByText(/bestSellers.header/i);

    expect(bestSellersHeader).toBeInTheDocument();
  });

  test("Should render loader if isLoading", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
      data: mockData,
      isLoading: true,
      isSuccess: true,
      isError: false,
      error: null
    });
    renderWithProviders(<BestSellers />);
    const bestSellersLoader = screen.getByText(/Loading/i);

    expect(bestSellersLoader).toBeInTheDocument();
  });

  test("Should render product cards when data is available", async () => {
    (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    });
    renderWithProviders(<BestSellers />);
    const productCards = await screen.findAllByRole("link");
    expect(productCards.length).toBe(5);
  });

  test("Should render no product cards when data is empty", async () => {
    (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: null
    });

    renderWithProviders(<BestSellers />);

    const productCards = screen.queryAllByRole("link");
    expect(productCards.length).toBe(0);
  });
});
