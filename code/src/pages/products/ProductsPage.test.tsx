import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProductsPage from "@/pages/products/ProductsPage";
import { useGetProductsQuery } from "@/store/api/productsApi";

jest.mock("@/store/api/productsApi", () => ({
  useGetProductsQuery: jest.fn()
}));

jest.mock("@/components/product-card/ProductCard", () =>
  jest.fn(() => <div data-testid="product-card" />)
);

const mockProducts = [
  { id: 1, name: "Product 1", price: 100 },
  { id: 2, name: "Product 2", price: 200 },
  { id: 3, name: "Product 3", price: 300 },
  { id: 4, name: "Product 4", price: 400 }
];

const renderProductsPage = () =>
  render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>
  );

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders products when data is available", () => {
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false
    });

    renderProductsPage();

    expect(screen.getAllByTestId("product-card")).toHaveLength(
      mockProducts.length
    );
  });

  test("renders the product count correctly", () => {
    renderProductsPage();
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false
    });

    expect(screen.getByText(mockProducts.length)).toBeInTheDocument();
  });

  test("renders the sort by section", () => {
    renderProductsPage();
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isLoading: false
    });

    expect(screen.getByText(/Sort by: Recommended/i)).toBeInTheDocument();
  });
});
