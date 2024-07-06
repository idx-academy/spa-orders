import { render, screen } from "@testing-library/react";

import CategorySection from "@/layouts/category-section/CategorySection";
import categorySectionElements from "@/layouts/category-section/CategorySection.constants";

describe("Category section", () => {
  test("renders three category elements correctly", () => {
    render(<CategorySection />);

    const categorySectionItems = screen.getAllByTestId(
      "spa-category-section-item"
    );
    expect(categorySectionItems).toHaveLength(categorySectionElements.length);
  });
});
