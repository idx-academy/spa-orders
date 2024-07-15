import { render, screen } from "@testing-library/react";

import AppMenuItem from "@/components/app-menu-item/AppMenuItem";

describe("AppMenuItem", () => {
  test("renders correctly", () => {
    render(<AppMenuItem>Test Item</AppMenuItem>);
    const menuItem = screen.getByText("Test Item");
    expect(menuItem).toBeInTheDocument();
  });
});
