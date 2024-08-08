import { fireEvent, screen } from "@testing-library/react";

import HeaderSearchInput from "@/layouts/header/components/header-search-input/HeaderSearchInput";

import { useGetUserProductsBySearchQuery } from "@/store/api/productsApi";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";
import { setupMockIntersectionObserver } from "@/utils/setup-mock-intersection-observer/setupMockIntersectionObserver";
import typeIntoInput from "@/utils/type-into-input/typeIntoInput";

jest.mock("@/store/api/productsApi", () => ({
  useGetUserProductsBySearchQuery: jest.fn()
}));

const mockedContent = [{ id: 1, name: "Product 1", image: "image1.png" }];

const mockUseGetUserProductsBySearchQuery = {
  data: null,
  isLoading: false,
  isError: false
};

const mockUseGetUserProductsBySearchQueryWithData = {
  ...mockUseGetUserProductsBySearchQuery,
  data: {
    totalElements: 5,
    content: mockedContent
  }
};

describe("HeaderSearchInput", () => {
  setupMockIntersectionObserver();
  describe("With results", () => {
    beforeEach(() => {
      (useGetUserProductsBySearchQuery as jest.Mock).mockReturnValue(
        mockUseGetUserProductsBySearchQueryWithData
      );
      renderWithProviders(<HeaderSearchInput />);
    });

    test("renders search field", () => {
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();
    });

    test("changes input value", async () => {
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      await typeIntoInput(searchField, "test");
      expect(searchField).toHaveValue("test");
    });

    test("clears input value when clear button is clicked", async () => {
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      const clearButton = screen.getByTestId("ClearIcon");

      await typeIntoInput(searchField, "Hello!");
      expect(searchField).toHaveValue("Hello!");

      fireEvent.click(clearButton);
      expect(searchField).toHaveValue("");
    });

    test("closes dropdown when input value is cleared", async () => {
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      await typeIntoInput(searchField, "test");
      expect(searchField).toHaveValue("test");

      await typeIntoInput(searchField, "");

      const dropdown = screen.queryByTestId("search-dropdown");
      expect(dropdown).not.toBeInTheDocument();
    });

    test("opens dropdown when search query length is 3 or more", async () => {
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      await typeIntoInput(searchField, "tes");
      expect(searchField).toHaveValue("tes");

      const dropdown = await screen.findByTestId("search-dropdown");
      expect(dropdown).toBeInTheDocument();
    });

    test("does not open dropdown when search query length is less than 3", async () => {
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      await typeIntoInput(searchField, "t");
      expect(searchField).toHaveValue("t");

      const dropdown = screen.queryByTestId("search-dropdown");
      expect(dropdown).not.toBeInTheDocument();
    });
  });

  describe("Without results", () => {
    test("displays loading label when isLoading is true", async () => {
      (useGetUserProductsBySearchQuery as jest.Mock).mockReturnValue({
        ...mockUseGetUserProductsBySearchQuery,
        isLoading: true
      });

      renderWithProviders(<HeaderSearchInput />);
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      await typeIntoInput(searchField, "test");
      expect(searchField).toHaveValue("test");

      const skeletonElements = screen.getAllByTestId("search-skeleton");
      expect(skeletonElements).toHaveLength(5);
    });

    test("displays no-results label when totalElements is undefined and not loading", async () => {
      (useGetUserProductsBySearchQuery as jest.Mock).mockReturnValue({
        ...mockUseGetUserProductsBySearchQuery,
        data: {
          totalElements: 0,
          content: []
        }
      });

      renderWithProviders(<HeaderSearchInput />);
      const searchField = screen.getByPlaceholderText(
        /header.searchInputPlaceholder/
      );
      expect(searchField).toBeInTheDocument();

      await typeIntoInput(searchField, "test");

      const skeletonElements = screen.getByText(/header.searchInputNoResults/);
      expect(skeletonElements).toBeInTheDocument();
    });
  });
});
