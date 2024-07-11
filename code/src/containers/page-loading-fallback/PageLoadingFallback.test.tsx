import { render, screen } from "@testing-library/react";

import PageLoadingFallback from "@/containers/page-loading-fallback/PageLoadingFallback";

describe("Test PageLoadingFallback", () => {
  test("Should render loading fallback", () => {
    render(<PageLoadingFallback />);

    const fallbackContainerElement = screen.getByTestId(
      "page-loading-fallback"
    );
    const skeletonElement = screen.getByTestId(
      "page-loading-fallback-skeleton"
    );

    expect(fallbackContainerElement).toBeInTheDocument();
    expect(skeletonElement).toBeInTheDocument();
  });

  test("Should have proper class when fullScreen is not passed", () => {
    render(<PageLoadingFallback />);

    const circleProgressElement = screen.getByTestId("page-loading-fallback");

    expect(circleProgressElement).not.toHaveClass(
      "page-loading-fallback__full-screen"
    );
  });

  test("Should have proper class when fullScreen is passed", () => {
    render(<PageLoadingFallback fullScreen />);

    const circleProgressElement = screen.getByTestId("page-loading-fallback");

    expect(circleProgressElement).toHaveClass(
      "page-loading-fallback__full-screen"
    );
  });
});
