import { fireEvent, screen } from "@testing-library/react";

import HeaderSearchInputDropdown from "@/layouts/header/components/header-search-input-dropdown/HeaderSearchInputDropdown";

import useInfiniteScroll from "@/hooks/use-infinite-scroll/useInfiniteScroll";
import { ProductFromSearch } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/api/productsApi", () => ({
  useGetUserProductsBySearchQuery: jest.fn()
}));

jest.mock("@/hooks/use-infinite-scroll/useInfiniteScroll");

const searchResults: ProductFromSearch[] = [
  { id: "1", name: "Product 1", image: "image1.png" },
  { id: "2", name: "Product 2", image: "image2.png" }
];

const noResultsLabel = /header.searchInputNoResults/;
const mockHandleCloseDropdown = jest.fn();
const mockLoadNextPage = jest.fn();

const renderComponent = (props = {}) => {
  const defaultProps = {
    handleCloseDropdown: mockHandleCloseDropdown,
    searchResults: [],
    totalElements: 0,
    isError: false,
    isLoading: false,
    loadNextPage: mockLoadNextPage,
    ...props
  };

  return renderWithProviders(<HeaderSearchInputDropdown {...defaultProps} />);
};

describe("HeaderSearchInputDropdown", () => {
  describe("renders and test functionality", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      (useInfiniteScroll as jest.Mock).mockReturnValue(jest.fn());
    });

    test("renders error label when isError is true", () => {
      renderComponent({ isError: true });

      const errorLabel = screen.getByText(/errors.somethingWentWrong/);
      expect(errorLabel).toBeInTheDocument();
    });

    test("renders loading label when isLoading is true", () => {
      renderComponent({ isLoading: true });

      const skeletonElements = screen.getAllByTestId("search-skeleton");
      expect(skeletonElements).toHaveLength(5)
    });

    test("renders no results label when totalElements is 0 and not loading", () => {
      renderComponent({ totalElements: 0 });

      const noResultsLabelElement = screen.getByText(noResultsLabel);
      expect(noResultsLabelElement).toBeInTheDocument();

      const noResultsImage = screen.getByAltText(/no results image/);
      expect(noResultsImage).toBeInTheDocument();
    });

    test("renders search results when there are results", () => {
      renderComponent({ searchResults, totalElements: searchResults.length });

      const searchResultsLabel = screen.getByText(/header.searchInputResults/);
      expect(searchResultsLabel).toBeInTheDocument();

      const product1 = screen.getByText(/Product 1/);
      expect(product1).toBeInTheDocument();
    });

    test("calls handleCloseDropdown when a search result is clicked", () => {
      renderComponent({ searchResults, totalElements: searchResults.length });

      const product1 = screen.getByText(/Product 1/);
      fireEvent.click(product1);

      expect(mockHandleCloseDropdown).toHaveBeenCalled();
    });
  });

  describe("lastItemRef assignment", () => {
    let mockLastItemRef: jest.Mock;

    beforeEach(() => {
      mockLastItemRef = jest.fn();
      (useInfiniteScroll as jest.Mock).mockReturnValue(mockLastItemRef);
      renderComponent({ searchResults, totalElements: searchResults.length });
    });

    test("assigns lastItemRef to the last item in searchResults", () => {
      const lastItem = screen.getByText(/Product 2/).closest("li");
      expect(mockLastItemRef).toHaveBeenCalledWith(lastItem);
    });

    test("does not assign lastItemRef to items that are not the last item in searchResults", () => {
      const firstItem = screen.getByText(/Product 1/).closest("li");
      expect(mockLastItemRef).not.toHaveBeenCalledWith(firstItem);
    });
  });
});
