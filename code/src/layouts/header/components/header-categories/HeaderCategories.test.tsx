import { screen } from "@testing-library/react";

import HeaderCategories from "@/layouts/header/components/header-categories/HeaderCategories";
import { categories } from "@/layouts/header/components/header-categories/HeaderCategories.constants";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("HeaderCategories", () => {
  test("renders categories correctly", () => {
    renderWithProviders(<HeaderCategories />);

    const categoryItems = screen.getAllByTestId("menu-item");
    expect(categoryItems).toHaveLength(categories.length);
  });

  test("Should render navLink", () => {
    renderWithProviders(<HeaderCategories />);

    const navLink = screen.getByTestId("nav-link");
    expect(navLink).toBeInTheDocument();
  });

  test("Should render navLink as last category in a list", () => {
    renderWithProviders(<HeaderCategories />, {
      initialEntries: ["/products?category=mobile"]
    });

    const links = screen.getAllByRole("link");
    const lastLink = links[links.length - 1];

    expect(lastLink).toHaveAttribute("data-testid", "nav-link");
  });
});
