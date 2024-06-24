import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Categories from "@/layouts/app-header/components/categories/Categories";
import { categories } from "@/layouts/app-header/components/categories/Categories.constants";

describe("Categories Component", () => {
  test("render number length of categories", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    const categoryItems = screen.getAllByTestId("menu-item");
    expect(categoryItems).toHaveLength(categories.length);
  });
});
