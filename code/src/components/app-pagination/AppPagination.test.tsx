import { fireEvent, screen } from "@testing-library/react";

import AppPagination from "@/components/app-pagination/AppPagination";

import usePagination from "@/hooks/use-pagination/usePagination";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/hooks/use-pagination/usePagination");

const mockSetPage = jest.fn();

const renderAndMock = (page = 3) => {
  (usePagination as jest.Mock).mockReturnValue({ page, setPage: mockSetPage });

  return renderWithProviders(<AppPagination page={page} count={5} />, {
    initialEntries: ["?category=mobile"]
  });
};

describe("AppPagination", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    renderAndMock();
    const paginationItems = screen.getAllByRole("listitem");
    expect(paginationItems.length).toBe(7);
  });

  test("changes page correctly", async () => {
    const { rerender } = renderAndMock();

    const initiallyActiveButton = screen.getByRole("button", {
      name: "page 3"
    });
    const initiallyInactiveButton = screen.getByRole("button", {
      name: "Go to page 1"
    });

    expect(initiallyActiveButton).toHaveClass("Mui-selected");
    expect(initiallyInactiveButton).not.toHaveClass("Mui-selected");

    fireEvent.click(initiallyInactiveButton);

    expect(mockSetPage).toHaveBeenCalledWith(1);

    rerender(<AppPagination page={1} count={5} />);

    const activeButton = await screen.findByRole("button", {
      name: "page 1"
    });
    const inactiveButton = screen.getByRole("button", {
      name: "Go to page 3"
    });
    expect(activeButton).toHaveClass("Mui-selected");
    expect(inactiveButton).not.toHaveClass("Mui-selected");

    screen.debug();
  });

  test("does not sets previous button as active when we click on it", () => {
    renderAndMock();

    const previousPageButton = screen.getByRole("button", {
      name: "Go to previous page"
    });

    fireEvent.click(previousPageButton);
    expect(mockSetPage).not.toHaveBeenCalled();
    expect(previousPageButton).not.toHaveClass("Mui-selected");
  });
});
