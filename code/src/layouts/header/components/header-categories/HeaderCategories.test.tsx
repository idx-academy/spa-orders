import { render, screen } from "@testing-library/react";
import HeaderCategories from "@/layouts/header/components/header-categories/HeaderCategories";
import { categories } from "@/layouts/header/components/header-categories/HeaderCategories.constants";
import { MemoryRouter } from "react-router-dom";

describe("HeaderCategories", () => {
  test("renders categories correctly", () => {
    render(
      <MemoryRouter>
        <HeaderCategories />
      </MemoryRouter>
    );

    const categoryItems = screen.getAllByTestId("menu-item");
    expect(categoryItems).toHaveLength(categories.length);
  });
});
