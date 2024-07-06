import { render, screen } from "@testing-library/react";

import AppSkeleton from "@/components/app-skeleton/AppSkeleton";

describe("Test AppSkeleton", () => {
  test("Should render AppSkeleton", () => {
    render(<AppSkeleton data-testid="app-skeleton" />);

    const skeleton = screen.getByTestId("app-skeleton");

    expect(skeleton).toBeInTheDocument();
  });
});
