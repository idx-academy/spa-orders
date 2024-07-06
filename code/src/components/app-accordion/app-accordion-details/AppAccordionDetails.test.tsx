import { render, screen } from "@testing-library/react";

import AppAccordionDetails from "@/components/app-accordion/app-accordion-details/AppAccordionDetails";

describe("AppAccordionDetails", () => {
  test("renders AppAccordionDetails with child", () => {
    render(
      <AppAccordionDetails>
        <div>child</div>
      </AppAccordionDetails>
    );

    const accordionDetailsElement = screen.getByText("child");
    expect(accordionDetailsElement).toBeInTheDocument();
  });
});
