import PageWrapper from "@/layouts/app-wrapper/PageWrapper";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

describe("PageWrapper", () => {
  test("should render children", () => {
    render(
      <PageWrapper>
        <div>Test children</div>
      </PageWrapper>
    );

    expect(screen.getByText("Test children")).toBeInTheDocument();
  });
});
