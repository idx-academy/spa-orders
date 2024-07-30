import { render, screen } from "@testing-library/react";

import HeaderUnauthorizedUserToolbar from "@/layouts/header/components/header-toolbar/header-unauthorized-user-toolbar/HeaderUnauthorizedUserToolbar";

jest.mock(
  "@/layouts/header/components/header-buttons/header-cart-button/HeaderCartButton",
  () => () => <div>Cart Button</div>
);
jest.mock(
  "@/layouts/header/components/header-buttons/header-login-button/HeaderLoginButton",
  () => () => <div>Login Button</div>
);

describe("Test HeaderUnauthorizedUserToolbar", () => {
  it("should render the cart button and login button", () => {
    render(<HeaderUnauthorizedUserToolbar />);

    const cartButton = screen.getByText("Cart Button");
    const loginButton = screen.getByText("Login Button");

    expect(cartButton).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });
});
