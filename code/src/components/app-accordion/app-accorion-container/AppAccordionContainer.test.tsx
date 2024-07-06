import { render, screen } from "@testing-library/react";

import AppAccordionContainer from "@/components/app-accordion/app-accorion-container/AppAccordionContainer";

describe("AppAccordionContainer", () => {
  test("renders AppAccordionContainer expanded", () => {
    render(
      <AppAccordionContainer expanded>
        <div>Child</div>
      </AppAccordionContainer>
    );

    const accordionContainer = screen.getByText("Child").parentElement;

    expect(accordionContainer).toHaveClass("spa-accordion-container--expanded");
  });
});
