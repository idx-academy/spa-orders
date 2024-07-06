import { render, screen } from "@testing-library/react";

import AppBadge from "@/components/app-badge/AppBadge";

describe("AppBadge", () => {
  test("renders AppBadge component", () => {
    render(<AppBadge>children</AppBadge>);

    const children = screen.getByText("children");
    expect(children).toBeInTheDocument();
  });

  test("Does not apply spa-badge__no-rounded class by default", () => {
    render(<AppBadge>children</AppBadge>);

    const children = screen.getByText("children");
    expect(children).not.toHaveClass("spa-badge__no-rounded");
  });

  test("applies the no-round class when isRounded is false", () => {
    render(<AppBadge isRounded={false}>children</AppBadge>);

    const children = screen.getByText("children");
    expect(children).toHaveClass("spa-badge__no-rounded");
  });

  test("Applies the spa-badge__no-children class when badge has no children", () => {
    render(<AppBadge data-testid="badge" />);

    const children = screen.getByTestId("badge");
    expect(children).toHaveClass("spa-badge__no-children");
  });

  test("Does not apply spa-badge__no-children class when badge has children", () => {
    render(<AppBadge data-testid="badge">children</AppBadge>);

    const children = screen.getByTestId("badge");
    expect(children).not.toHaveClass("spa-badge__no-children");
  });
});
