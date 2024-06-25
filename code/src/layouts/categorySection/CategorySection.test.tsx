import { render, screen } from "@testing-library/react";
import CategorySection from "@/layouts/categorySection/CategorySection";
import categorySectionElements from "@/layouts/categorySection/CategorySection.constants";

describe("Category section", () => {
  test("renders three category elements correctly", () => {
    render(<CategorySection />);

    const categorySectionItems = screen.getAllByTestId(
      "spa-category-section-item"
    );
    expect(categorySectionItems).toHaveLength(categorySectionElements.length);
  });
});
