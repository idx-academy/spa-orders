import { screen } from "@testing-library/react";
import AppPagination from "./AppPagination";
import { renderWithProviders } from "@/utils/test-utils";

describe("Test AppPagination", () => {
  test("renders correctly", () => {
    renderWithProviders(<AppPagination page={1} count={2} />);

    const paginationItems = screen.getAllByRole("link");

    expect(paginationItems.length).toBe(4);
  });

  test("Correctly sets links", () => {
    renderWithProviders(<AppPagination page={3} count={5} />, {
      initialEntries: ["?category=mobile"]
    });

    const anchorElement = screen.getAllByRole("link")[1];

    expect(anchorElement).toHaveAttribute("href", "/?category=mobile&page=1");
  });
});
