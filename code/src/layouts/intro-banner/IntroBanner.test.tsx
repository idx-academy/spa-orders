import { render, screen } from "@testing-library/react";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";

describe("IntroBanner", () => {
  beforeEach(() => {
    render(<IntroBanner />);
  });

  test("should render IntroBanner title", () => {
    const headerText = screen.getByText("introBanner.header");
    expect(headerText).toBeInTheDocument();
  });

  test("should render IntroBanner badge with right properties", () => {
    const badge =
      screen.getByText("introBanner.badge").parentElement?.parentElement;

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass("spa-badge__no-rounded");
  });
});
