import { fireEvent, screen } from "@testing-library/react";

import HeaderSearchInputDropdown from "@/layouts/header/components/header-search-input-dropdown/HeaderSearchInputDropdown";

import { ProductFromSearch } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/productsApi", () => ({
  useGetUserProductsBySearchQuery: jest.fn()
}));

const searchResults: ProductFromSearch[] = [
  { id: "1", name: "Product 1", image: "image1.png" },
  { id: "2", name: "Product 2", image: "image2.png" }
];

const noResultsLabel = /header.searchInputNoResults/;

const mockHandleCloseDropdown = jest.fn();

const renderComponent = (props = {}) => {
  const defaultProps = {
    handleCloseDropdown: mockHandleCloseDropdown,
    searchResults: [],
    totalElements: 0,
    isError: false,
    isLoading: false,
    ...props
  };

  return renderWithProviders(<HeaderSearchInputDropdown {...defaultProps} />);
};

describe("HeaderSearchInputDropdown", () => {
  test("renders error label when isError is true", () => {
    renderComponent({ isError: true });

    const errorLabel = screen.getByText(/errors.somethingWentWrong/i);
    expect(errorLabel).toBeInTheDocument();
  });

  test("renders loading label when isLoading is true", () => {
    renderComponent({ isLoading: true });

    const loadingLabel = screen.getByText(/Loading.../i);
    expect(loadingLabel).toBeInTheDocument();
  });

  test("renders no results label when totalElements is 0 and not loading", () => {
    renderComponent({ totalElements: 0 });

    const noResultsLabelElement = screen.getByText(noResultsLabel);
    expect(noResultsLabelElement).toBeInTheDocument();

    const noResultsImage = screen.getByAltText(/no results image/i);
    expect(noResultsImage).toBeInTheDocument();
  });

  test("renders search results when there are results", () => {
    renderComponent({ searchResults, totalElements: searchResults.length });

    const searchResultsLabel = screen.getByText(/header.searchInputResults/i);
    expect(searchResultsLabel).toBeInTheDocument();

    const product1 = screen.getByText(/Product 1/i);
    expect(product1).toBeInTheDocument();
  });

  test("calls handleCloseDropdown when a search result is clicked", () => {
    renderComponent({ searchResults, totalElements: searchResults.length });

    const product1 = screen.getByText(/Product 1/i);
    fireEvent.click(product1);

    expect(mockHandleCloseDropdown).toHaveBeenCalled();
  });
});
