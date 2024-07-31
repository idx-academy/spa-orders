import { screen } from "@testing-library/react";

import OrderProductItem from "@/containers/order-item/components/order-product-item/OrderProductItem";

import { Product } from "@/types/product.types";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

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
    const totalPrice = mockProduct.price * quantity;

    renderWithProviders(
      <OrderProductItem
        product={mockProduct}
        quantity={quantity}
        totalPrice={totalPrice}
      />
    );
    const productName = screen.getByText(mockProduct.name);
    expect(productName).toBeInTheDocument();
  });
});
