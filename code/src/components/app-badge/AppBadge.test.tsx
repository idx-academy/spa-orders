import { render, screen } from "@testing-library/react";
import AppBadge from "@/components/app-badge/AppBadge";

describe("AppBadge", () => {
  test("renders AppBadge component", () => {
    render(<AppBadge>children</AppBadge>);

    const children = screen.getByText("children");
    expect(children).toBeInTheDocument();
  });

  test("applies the no-round class when isRounded is false", () => {
    render(<AppBadge isRounded={false}>children</AppBadge>);

    const children = screen.getByText("children");
    expect(children).toHaveClass("spa-badge__no-rounded");
  });
});
