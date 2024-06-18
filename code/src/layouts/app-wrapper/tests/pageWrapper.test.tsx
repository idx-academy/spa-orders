import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import { render, screen } from "@testing-library/react";

describe("PageWrapper", () => {
  test("should render children", () => {
    render(<PageWrapper>Test children</PageWrapper>);
    const children = screen.getByText("Test children");
    expect(children).toBeInTheDocument();
  });
});
