import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import ProductCard from "@/components/product-card/ProductCard";
import { Product } from "@/types/product.types";

const mockProduct: Product = {
  id: "1",
  name: "Mobile Phone Samsung",
  description: "Super product",
  image: "image-url",
  price: "$10.00",
  status: "AVAILABLE",
  tags: ["test", "product"]
};

describe("ProductCard", () => {
  test("renders Add button", () => {
    render(
      <BrowserRouter>
        <ProductCard product={mockProduct} />
      </BrowserRouter>
    );

    const addButton = screen.getByRole("button");
    expect(addButton).toBeInTheDocument();
  });
});
