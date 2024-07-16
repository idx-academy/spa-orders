import { screen } from "@testing-library/react";

import OrderSummary from "@/containers/order-summary/OrderSummary";

import formatPrice from "@/utils/format-price/formatPrice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

jest.mock("@/utils/format-price/formatPrice");

const totalPrice = 1000.45;

describe("OrderSummary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (formatPrice as jest.Mock).mockReturnValue("$1000.45");
    renderWithProviders(
      <OrderSummary
        isLoading={false}
        handleCreateOrder={jest.fn}
        totalPrice={totalPrice}
      />
    );
  });

  test("renders order summary labels and button correctly", () => {
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
  });

  test("formats and displays the total price correctly", () => {
    const price = screen.getAllByText("$1000.45");
    expect(price).toHaveLength(2);
  });
});
