import { render, screen } from "@testing-library/react";
import OrderItem from "@/layouts/order-item/OrderItem";
import { Order } from "@/types/order.types";
import formatPrice from "@/utils/formatPrice";

const mockOrder: Order = {
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
  createdAt: "2024-06-27T12:35:14.396Z"
};

describe("OrderItem", () => {
  beforeEach(() => {
    render(<OrderItem order={mockOrder} />);
  });

  test("renders order receiver details", () => {
    const receiverEmail = screen.getByText(/john.doe@example.com/);

    expect(receiverEmail).toBeInTheDocument();
  });
  test("renders total price correctly", () => {
    const totalPrice = screen.getAllByText(
      formatPrice(mockOrder.orderItems[0].price)
    );
    expect(totalPrice).toHaveLength(2);
  });
});
