import { render, screen } from "@testing-library/react";

import OrdersList from "@/layouts/orders-list/OrdersList";

import { orderStatusesTranslationKeys } from "@/constants/orderStatuses";
import { UserOrder } from "@/types/order.types";

const mockOrder: UserOrder = {
  id: "order-1",
  total: 100,
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

describe("Test OrdersList", () => {
  test("Should render orders list", () => {
    render(<OrdersList orders={[mockOrder]} />);

    const emailElements = screen.getByText(
      orderStatusesTranslationKeys[mockOrder.orderStatus]
    );

    expect(emailElements).toBeInTheDocument();
  });
});
