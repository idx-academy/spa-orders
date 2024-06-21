import { IntlProvider } from "react-intl";
import { render, screen } from "@testing-library/react";
import CategorySection from "@/components/categorySection/CategorySection";
import paragraphs from "@/shared/modules/application/i18n/en.json";
import categorySectionElements from "@/components/categorySection/CategorySection.constants";

test("renders four subintro elements correctly", () => {
  render(
    <IntlProvider locale="en" messages={paragraphs}>
      <CategorySection />
    </IntlProvider>
  );

  const categorySectionItems = screen.getAllByTestId(
    "spa-category-section-item"
  );
  expect(categorySectionItems).toHaveLength(categorySectionElements.length);
});
