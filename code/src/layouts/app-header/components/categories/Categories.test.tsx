import { render, screen } from "@testing-library/react";
import Categories from "@/layouts/app-header/components/categories/Categories";
import { categories } from "@/layouts/app-header/components/categories/Categories.constants";

describe("Categories Component", () => {
  test("render number length of categories", () => {
    render(<Categories />);

    const categoryItems = screen.getAllByTestId("menu-item");
    expect(categoryItems).toHaveLength(categories.length);
  });
});
