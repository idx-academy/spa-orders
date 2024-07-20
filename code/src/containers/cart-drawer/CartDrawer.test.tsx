import { fireEvent, render, screen } from "@testing-library/react";
import { useNavigate } from "react-router-dom";

import CartDrawer from "@/containers/cart-drawer/CartDrawer";

import { useDrawerContext } from "@/context/drawer/DrawerContext";
import { useModalContext } from "@/context/modal/ModalContext";
import useUserCartItems from "@/hooks/use-user-cart-items/useUserCartItems";
import { UserDetails } from "@/types/user.types";
import formatPrice from "@/utils/format-price/formatPrice";

jest.mock("@/utils/format-price/formatPrice", () => ({
  __esModule: true,
  default: jest.fn()
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn()
}));

jest.mock("@/context/modal/ModalContext", () => ({
  useModalContext: jest.fn()
}));

jest.mock("@/context/drawer/DrawerContext", () => ({
  useDrawerContext: jest.fn()
}));

jest.mock("@/hooks/use-user-cart-items/useUserCartItems", () => jest.fn());

const closeDrawer = jest.fn();
const openModal = jest.fn();
const navigate = jest.fn();
const mockFormatPrice = jest.fn();

const mockCartItems = {
  items: [
    {
      productId: "1",
      name: "Product 1",
      productPrice: 10,
      quantity: 1,
      image: "some image",
      calculatedPrice: 10
    },
    {
      productId: "2",
      name: "Product 2",
      productPrice: 20,
      quantity: 1,
      image: "some image",
      calculatedPrice: 20
    }
  ],
  totalPrice: 30
};

const renderAndMock = (data: Partial<ReturnType<typeof useUserCartItems>> = {}) => {
  (formatPrice as jest.Mock).mockImplementation(mockFormatPrice);
  (useNavigate as jest.Mock).mockReturnValue(navigate);
  (useDrawerContext as jest.Mock).mockReturnValue({ closeDrawer });
  (useModalContext as jest.Mock).mockReturnValue({ openModal });
  (useUserCartItems as jest.Mock).mockReturnValue({
    cartItems: data.cartItems || mockCartItems,
    cartItemsLoading: false,
    isError: false,
    handleRemoveItem: jest.fn(),
    ...data
  });

  render(<CartDrawer />);
};

describe("CartDrawer", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should render the cart drawer header", () => {
    renderAndMock();

    const cartHeader = screen.getByText("cart.tooltip");

    expect(cartHeader).toBeInTheDocument();
  });

  test("Should render the cart items", () => {
    renderAndMock({ cartItems: mockCartItems });

    const productNameElement = screen.getByText("Product 1");
    expect(productNameElement).toBeInTheDocument();

    const subtotal = screen.getByText(/cart.subtotal/);
    expect(subtotal).toBeInTheDocument();

    expect(mockFormatPrice).toHaveBeenCalledTimes(3);
    expect(mockFormatPrice).toHaveBeenCalledWith(30);
  });

  test("Should render the empty cart message", () => {
    renderAndMock({ cartItems: { items: [], totalPrice: 0 } });

    const emptyCartMessageElement = screen.getByText("cart.emptyItem");
    expect(emptyCartMessageElement).toBeInTheDocument();

    expect(mockFormatPrice).toHaveBeenCalledWith(0);
  });

  test("Should navigate to the cart page when user is logged in", () => {
    renderAndMock({ user: { id: 1 } as UserDetails });

    const viewCartButton = screen.getByText("cart.viewCart");
    fireEvent.click(viewCartButton);

    expect(navigate).toHaveBeenCalledWith("/cart");
  });

  test("Should open the authentication modal when user is not logged in", () => {
    renderAndMock();

    fireEvent.click(screen.getByText("cart.viewCart"));
    expect(openModal).toHaveBeenCalled();
  });

  test("Should close the cart drawer when the close button is clicked", () => {
    renderAndMock();

    const closeDrawerButton = screen.getAllByRole("button")[0];

    fireEvent.click(closeDrawerButton);
    expect(closeDrawer).toHaveBeenCalled();
  });

  test("Should call remove function when remove button is clicked", () => {
    const mockRemove = jest.fn();
    renderAndMock({ handleRemoveItem: mockRemove, cartItems: mockCartItems });

    const removeButton = screen.getAllByTestId(
      "remove-item-from-cart-button"
    )[0];

    fireEvent.click(removeButton);

    expect(mockRemove).toHaveBeenCalled();
  });

  test("Should show an error message", () => {
    renderAndMock({ isError: true });

    const errorMessage = screen.getByText(/error.label/);
    expect(errorMessage).toBeInTheDocument();

    expect(mockFormatPrice).not.toHaveBeenCalled();
  });

  test("Should render the cart items with undefined cartItems", () => {
    renderAndMock({ cartItems: undefined });

    const emptyCartMessageElement = screen.getByText("cart.emptyItem");
    expect(emptyCartMessageElement).toBeInTheDocument();

    expect(mockFormatPrice).toHaveBeenCalledWith(0);
  });
});
