import { render, screen } from "@testing-library/react";

import OrderProductDetails from "@/layouts/order-item/components/order-item-details/OrderItemDetails";

import { UserOrder } from "@/types/order.types";

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
  createdAt: "20.12.2020",
  total: 0
};

describe("Test OrderProductDetails", () => {
  test("Should correctly render address fields", () => {
    render(<OrderProductDetails order={mockOrder} />);

    const cityField = screen.getByText(/orderProductItem.details.city/);
    const departmentField = screen.getByText(
      /orderProductItem.details.department/
    );
    const deliveryMethodField = screen.getByText(
      /orderProductItem.details.deliveryMethod/
    );
    const productName = screen.getByText(mockOrder.orderItems[0].product.name);

    expect(productName).toBeInTheDocument();
    expect(cityField).toBeInTheDocument();
    expect(departmentField).toBeInTheDocument();
    expect(deliveryMethodField).toBeInTheDocument();
  });
});
