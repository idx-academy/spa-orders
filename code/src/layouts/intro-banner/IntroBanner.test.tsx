import { render, screen } from "@testing-library/react";
import IntroBanner from "@/layouts/intro-banner/IntroBanner";

describe("IntroBanner", () => {
  test("should render IntroBanner component", () => {
    render(<IntroBanner />);
    const headerText = screen.getByText("introBanner.header");
    expect(headerText).toBeInTheDocument();
  });
});
