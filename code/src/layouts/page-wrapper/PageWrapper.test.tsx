import { render, screen } from "@testing-library/react";

import PageWrapper from "@/layouts/page-wrapper/PageWrapper";

describe("PageWrapper", () => {
  test("should render children", () => {
    render(<PageWrapper>Test children</PageWrapper>);
    const children = screen.getByText("Test children");
    expect(children).toBeInTheDocument();
  });
});
