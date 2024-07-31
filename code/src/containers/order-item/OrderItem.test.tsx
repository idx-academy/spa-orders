import { screen } from "@testing-library/react";

import OrderItem from "@/containers/order-item/OrderItem";

import { UserOrder } from "@/types/order.types";
import formatPrice from "@/utils/format-price/formatPrice";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const mockOrder: UserOrder = {
  id: "order-1",
  receiver: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com"
  },
  postAddress: {
    city: "New York",
    department: "Department 1",
    deliveryMethod: "NOVA"
  },
  orderItems: [
    {
      product: {
        id: "product-1",
        name: "Product 1",
        description: "Description of Product 1",
        status: "AVAILABLE",
        tags: ["tag1"],
        image: "https://example.com/product-1.jpg",
        price: 100
      },
      quantity: 2,
      price: 500
    }
  ],
  isPaid: false,
  orderStatus: "IN_PROGRESS",
  createdAt: "2024-06-27T12:35:14.396Z",
  total: 123
};

describe("OrderItem", () => {
  test("renders order receiver details", () => {
    renderWithProviders(<OrderItem order={mockOrder} />);

    const receiverEmail = screen.getByText(/john.doe@example.com/);

    expect(receiverEmail).toBeInTheDocument();
  });
  test("renders total price correctly", () => {
    renderWithProviders(
      <OrderItem order={{ ...mockOrder, isPaid: true }} isExpanded />
    );

    const totalPrice = screen.getByText(formatPrice(mockOrder.total));
    expect(totalPrice).toBeInTheDocument();
  });

  test("Should not render ExpandMoreIcon when isExpanded is true", () => {
    renderWithProviders(<OrderItem order={mockOrder} isExpanded />);
    const expandIcon = screen.queryByTestId("ExpandMoreIcon");
    expect(expandIcon).toBeNull();
  });
  test("Should render ExpandMoreIcon when isExpanded is false", () => {
    renderWithProviders(<OrderItem order={mockOrder} isExpanded={false} />);
    const expandIcon = screen.getByTestId("ExpandMoreIcon");
    expect(expandIcon).toBeInTheDocument();
  });
});
