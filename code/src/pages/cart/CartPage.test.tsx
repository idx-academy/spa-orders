import { screen } from "@testing-library/react";

import CartPage from "@/pages/cart/CartPage";
import { useGetCartItemsQuery } from "@/store/api/cartApi";
import { useUserDetailsSelector } from "@/store/slices/userSlice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/store/slices/userSlice", () => ({
  useUserDetailsSelector: jest.fn()
}));

jest.mock("@/store/api/cartApi", () => ({
  useGetCartItemsQuery: jest.fn()
}));

jest.mock("@/utils/format-price/formatPrice");

const mockUseUserDetailsSelector = useUserDetailsSelector as jest.Mock;
const mockUseGetCartItemsQuery = useGetCartItemsQuery as jest.Mock;

const mockedCartItems = {
  items: [
    {
      productId: "8efbee82-8a0c-407a-a4c0-16bbad40a23e",
      image: "https://example.com/phone.jpg",
      name: "Iphone",
      productPrice: 100.45,
      quantity: 2,
      calculatedPrice: 200.9
    }
  ],
  totalPrice: 1000.45
};

describe("CartPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUserDetailsSelector.mockReturnValue({ id: "4455667788" });
  });

  test("renders loading state", () => {
    mockUseGetCartItemsQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: false
    });

    renderWithProviders(<CartPage />);

    const progressbar = screen.getByRole("progressbar");
    expect(progressbar).toBeInTheDocument();
  });

  test("renders error state when there is an error fetching cart items", () => {
    mockUseGetCartItemsQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: true
    });

    renderWithProviders(<CartPage />);

    const errorMessage = screen.getByText(/error.label/);
    expect(errorMessage).toBeInTheDocument();
  });

  test("renders cart items and order summary correctly", () => {
    mockUseGetCartItemsQuery.mockReturnValue({
      data: mockedCartItems,
      isLoading: false,
      error: false
    });

    renderWithProviders(<CartPage />);

    const myCartLabel = screen.getByTestId("myCartLabel");
    expect(myCartLabel).toBeInTheDocument();

    const orderSummaryLabel = screen.getByTestId("orderSummaryLabel");
    expect(orderSummaryLabel).toBeInTheDocument();

    const subtotalLabel = screen.getByTestId("subtotalLabel");
    expect(subtotalLabel).toBeInTheDocument();

    const deliveryLabel = screen.getByTestId("deliveryLabel");
    expect(deliveryLabel).toBeInTheDocument();

    const freeLabel = screen.getByTestId("freeLabel");
    expect(freeLabel).toBeInTheDocument();

    const countryLabel = screen.getByTestId("countryLabel");
    expect(countryLabel).toBeInTheDocument();

    const totalLabel = screen.getByTestId("totalLabel");
    expect(totalLabel).toBeInTheDocument();

    const createOrderButton = screen.getByTestId("createOrderButton");
    expect(createOrderButton).toBeInTheDocument();

    const cartItemName = screen.getByText("Iphone");
    expect(cartItemName).toBeInTheDocument();
  });
});
