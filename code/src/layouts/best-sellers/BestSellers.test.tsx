import { screen } from "@testing-library/react";

import BestSellers from "@/layouts/best-sellers/BestSellers";
import { mockData as mockItems } from "@/layouts/best-sellers/BestSellers.constants";

import { useGetProductsQuery } from "@/store/api/productsApi";
import { RTKQueryMockState, RTKQueryReturnState } from "@/types/common";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockData = {
  content: mockItems.slice(0, 5),
  totalPages: 5,
  totalItems: 20
};

jest.mock("@/store/api/productsApi", () => ({
  useGetProductsQuery: jest.fn()
}));

jest.mock("@/hooks/use-snackbar/useSnackbar", () => ({
  __esModule: true,
  default: jest.fn(() => ({ openSnackbar: () => {} }))
}));

jest.mock("@/store/api/cartApi", () => ({
  useAddToCartMutation: jest.fn(() => [jest.fn(), {}])
}));

const defaultOptions: RTKQueryReturnState<typeof mockData> = {
  data: mockData,
  isLoading: false,
  isSuccess: true,
  isError: false,
  error: null
};

const renderAndMock = (
  extraOptions: RTKQueryMockState<typeof mockData> = {}
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

    const productCards = await screen.findAllByTestId("product-card");
    expect(productCards.length).toBe(5);
  });

  test("Should render no product cards when data is empty", async () => {
    renderAndMock({ data: null });

    const productCards = screen.queryAllByTestId("product-card");
    expect(productCards.length).toBe(0);
  });

  test("Should call useGetProductsQuery with correct params", () => {
    renderAndMock();

    expect(useGetProductsQuery).toHaveBeenCalledWith({ size: 5, page: 0 });
  });
});
