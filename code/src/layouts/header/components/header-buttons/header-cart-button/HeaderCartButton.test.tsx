import { fireEvent, render, screen } from "@testing-library/react";

import HeaderCartButton from "@/layouts/header/components/header-buttons/header-cart-button/HeaderCartButton";

import useGetCart from "@/hooks/use-get-cart/useGetCart";
import { CartItem } from "@/types/cart.types";

const mockOpenDrawer = jest.fn();

jest.mock("@/context/drawer/DrawerContext", () => ({
  ...jest.requireActual("@/context/drawer/DrawerContext"),
  useDrawerContext: jest.fn(() => ({ openDrawer: mockOpenDrawer }))
}));

jest.mock("@/hooks/use-get-cart/useGetCart", () => ({
  __esModule: true,
  default: jest.fn(() => ({ data: { items: mockCartItems } }))
}));

const mockCartItems = [
  {
    productId: "1",
    name: "Product 1",
    productPrice: 20,
    quantity: 99,
    image: "some image 1",
    calculatedPrice: 20
  },
  {
    productId: "2",
    name: "Product 2",
    productPrice: 20,
    quantity: 3,
    image: "some image 2",
    calculatedPrice: 60
  }
];

const renderAndMock = (cartItems: CartItem[] = mockCartItems) => {
  (useGetCart as jest.Mock).mockReturnValue({
    data: { items: cartItems }
  });

  render(<HeaderCartButton />);
};

describe("HeaderCartButton", () => {
  test("Should render button correctly", () => {
    renderAndMock();

    const cartButton = screen.getByTestId("header-cart-button");
    expect(cartButton).toBeInTheDocument();
  });

  test("Should render badge with 99+ quantity when quantity is greater than 99", () => {
    renderAndMock();

    const cartItemsCount = screen.getByText(/99+/);
    expect(cartItemsCount).toBeInTheDocument();
  });

  test("Should render badge with correct quantity when the quantity is lesser than 99", () => {
    renderAndMock(mockCartItems.slice(1, 2));

    const cartItemsCount = screen.getByText(/3/);
    expect(cartItemsCount).toBeInTheDocument();
  });

  test("Should not render badge when there is no cart items", () => {
    renderAndMock([]);

    const cartBadge = screen.queryByTestId("header-cart-badge");
    expect(cartBadge).not.toBeInTheDocument();
  });

  test("Should call openDrawer when button is clicked", () => {
    renderAndMock();

    const cartButton = screen.getByTestId("header-cart-button");
    fireEvent.click(cartButton);
    expect(mockOpenDrawer).toHaveBeenCalledTimes(1);
  });
});
