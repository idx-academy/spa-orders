import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderItem from "./OrderItem";
import { Order } from "@/types/order.types";

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
  createdAt: "20.12.2020"
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
    const totalPrice = screen.getAllByText("500$");
    expect(totalPrice).toHaveLength(2);
  });
});
