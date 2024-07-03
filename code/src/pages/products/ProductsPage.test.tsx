import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import ProductsPage from "@/pages/products/ProductsPage";
import { useGetProductsQuery } from "@/store/api/productsApi";

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

const renderProductsPage = () =>
  render(
    <MemoryRouter>
      <ProductsPage />
    </MemoryRouter>
  );

describe("ProductsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetProductsQuery as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false
    });
  });

  test("renders the product count correctly", () => {
    renderProductsPage();
    expect(screen.getByText(mockProducts.length)).toBeInTheDocument();
  });
});
