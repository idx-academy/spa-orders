import { render, screen } from "@testing-library/react";
import AppBadge from "./AppBadge";

describe("AppBadge", () => {
  it("renders AppBadge component", () => {
    render(<AppBadge>children</AppBadge>);
    const child = screen.getByText("children");
    expect(child).toBeInTheDocument();
  });

  it("applies the no-round class when isRounded is false", () => {
    const { container } = render(<AppBadge isRounded={false} />);
    expect(container.firstChild).toHaveClass("spa-badge__no-round");
  });
});
