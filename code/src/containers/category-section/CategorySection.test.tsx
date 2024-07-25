import { screen } from "@testing-library/react";

import CategorySection from "@/containers/category-section/CategorySection";
import categorySectionElements from "@/containers/category-section/CategorySection.constants";

import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

describe("Category section", () => {
  test("renders three category elements correctly", () => {
    renderWithProviders(<CategorySection />);

    const categorySectionItems = screen.getAllByTestId(
      "spa-category-section-item"
    );
    expect(categorySectionItems).toHaveLength(categorySectionElements.length);
  });
});
