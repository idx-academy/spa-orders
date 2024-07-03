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
});
