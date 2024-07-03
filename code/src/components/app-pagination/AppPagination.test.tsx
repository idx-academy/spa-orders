import { screen } from "@testing-library/react";
import AppPagination from "@/components/app-pagination/AppPagination";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("Test AppPagination", () => {
  beforeEach(() => {
    renderWithProviders(<AppPagination page={3} count={5} />, {
      initialEntries: ["?category=mobile"]
    });
  });

  test("renders correctly", () => {
    const paginationItems = screen.getAllByRole("link");

    expect(paginationItems.length).toBe(7);
  });

  test("Correctly sets links", () => {
    const anchorElement = screen.getAllByRole("link")[1];

    expect(anchorElement).toHaveAttribute("href", "/?category=mobile&page=1");
  });
});
