import { screen } from "@testing-library/react";

import BestSellers from "@/layouts/best-sellers/BestSellers";
import { useGetProductsQuery } from "@/store/api/productsApi";
import { renderWithProviders } from "@/utils/test-utils";

import { mockData as mockItems } from "@/layouts/best-sellers/BestSellers.constants";

const mockData = {
  content: mockItems.slice(0, 5),
  totalPages: 5,
  totalItems: 20
};

jest.mock("@/store/api/productsApi", () => ({
  useGetProductsQuery: jest.fn()
}));

test("Should render loader if isLoading", () => {
  (useGetProductsQuery as jest.Mock).mockReturnValueOnce({
    data: mockData,
    isLoading: true,
    isSuccess: true,
    isError: false,
    error: null
  });
  renderWithProviders(<BestSellers />);
  const productSkeleton = screen.getAllByTestId("spa-product-skeleton");

  expect(productSkeleton[0]).toBeInTheDocument();
});
