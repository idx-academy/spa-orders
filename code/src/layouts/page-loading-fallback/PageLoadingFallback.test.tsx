import { render, screen } from "@testing-library/react";
import PageLoadingFallback from "@/layouts/page-loading-fallback/PageLoadingFallback";

describe("Test PageLoadingFallback", () => {
  test("Should render loading fallback", () => {
    render(<PageLoadingFallback />);

    const circleProgressElement = screen.getByTestId("page-loading-skeleton");

    expect(circleProgressElement).toBeInTheDocument();
  });
});
