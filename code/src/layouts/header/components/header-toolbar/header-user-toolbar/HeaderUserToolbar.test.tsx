import { render, screen } from "@testing-library/react";

import HeaderUserToolbar from "@/layouts/header/components/header-toolbar/header-user-toolbar/HeaderUserToolbar";

jest.mock(
  "@/layouts/header/components/header-buttons/header-cart-button/HeaderCartButton",
  () => ({
    __esModule: true,
    default: () => <div>Cart Button</div>
  })
);
jest.mock(
  "@/layouts/header/components/header-buttons/header-logout-button/HeaderLogoutButton",
  () => ({
    __esModule: true,
    default: () => <div>Logout Button</div>
  })
);
jest.mock(
  "@/layouts/header/components/header-buttons/header-orders-button/HeaderOrdersButton",
  () => ({
    __esModule: true,
    default: () => <div>Orders Button</div>
  })
);

describe("Test HeaderUserToolbar", () => {
  it("should render the cart button, orders button and logout button", () => {
    render(<HeaderUserToolbar />);

    const cartButton = screen.getByText("Cart Button");
    const ordersButton = screen.getByText("Orders Button");
    const logoutButton = screen.getByText("Logout Button");

    expect(cartButton).toBeInTheDocument();
    expect(logoutButton).toBeInTheDocument();
    expect(ordersButton).toBeInTheDocument();
  });
});
