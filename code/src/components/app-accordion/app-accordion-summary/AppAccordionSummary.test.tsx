import { render, screen } from "@testing-library/react";

import AppAccordionSummary from "@/components/app-accordion/app-accordion-summary/AppAccordionSummary";

describe("AppAccordionSummary", () => {
  test("renders the AccordionSummary component with child", () => {
    render(
      <AppAccordionSummary>
        <div>child</div>
      </AppAccordionSummary>
    );

    const accordionSummaryChildren = screen.getByText("child");
    expect(accordionSummaryChildren).toBeInTheDocument();
  });
});
