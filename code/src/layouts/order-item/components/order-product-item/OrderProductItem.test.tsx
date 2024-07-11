import { render, screen } from "@testing-library/react";

import OrderProductItem from "@/layouts/order-item/components/order-product-item/OrderProductItem";

import { Product } from "@/types/product.types";

const mockProduct: Product = {
  id: "1",
  name: "Test Product",
  description: "This is a test product",
  price: 100,
  image: "test-image-url",
  status: "AVAILABLE",
  tags: []
};

describe("OrderProductItem", () => {
  test("renders product information correctly", () => {
    const quantity = 2;
    const price = mockProduct.price * quantity;

    render(
      <OrderProductItem
        product={mockProduct}
        quantity={quantity}
        price={price}
      />
    );
    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });
});
