import { render, screen } from "@testing-library/react";

import AppTypography from "@/components/app-typography/AppTypography";
import { AppTypographyVariant } from "@/components/app-typography/AppTypography.types";

const renderAndCheckForTag = (
  expectedTagName: string,
  variant?: AppTypographyVariant
) => {
  const content = "test content";
  render(<AppTypography variant={variant}>{content}</AppTypography>);

  const typography = screen.getByText(content);
  expect(typography).toBeInTheDocument();
  expect(typography.tagName).toBe(expectedTagName);
};

describe("AppTypography", () => {
  test("should render <p> by default", () => {
    renderAndCheckForTag("P");
  });

  test("should render heading as corresponding tags", () => {
    renderAndCheckForTag("H1", "h1");
  });

  test("should render caption as <span> by default", () => {
    renderAndCheckForTag("SPAN", "caption");
  });

  test("should render small-caption as span", () => {
    renderAndCheckForTag("SPAN", "caption-small");
  });

  test("should render translated text if translationKey is provided", () => {
    const translationKey = "translation.key";
    render(<AppTypography translationKey={translationKey} />);

    const typography = screen.getByText(translationKey);
    expect(typography).toBeInTheDocument();
  });
});
