import { render, screen } from "@testing-library/react";
import AppAccordionContainer from "@/components/app-accordion/app-accorion-container/AppAccordionContainer";

describe("AppAccordionContainer", () => {
  test("renders AppAccordionContainer with custom class", () => {
    render(
      <AppAccordionContainer>
        <div>Accordion Content</div>
      </AppAccordionContainer>
    );
    const accordionElement = screen.getByText("Accordion Content");
    expect(accordionElement).toBeInTheDocument();
  });

  test("applies expanded class when expanded", () => {
    render(
      <AppAccordionContainer expanded>
        <div>Accordion Content</div>
      </AppAccordionContainer>
    );
    const accordionElement = screen
      .getByText("Accordion Content")
      .closest(".spa-accordion-container");

    expect(accordionElement).toHaveClass("spa-accordion-container--expanded");
  });
});
