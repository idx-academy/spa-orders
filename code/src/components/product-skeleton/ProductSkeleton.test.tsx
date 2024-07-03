import { render, screen } from "@testing-library/react";
import ProductSkeleton from "@/components/product-skeleton/ProductSkeleton";

describe("Product Skeleton Card", () => {
  test("renders product skeleton component", () => {
    render(<ProductSkeleton />);

    const productSkeletonElement = screen.getByTestId("spa-product-skeleton");
    expect(productSkeletonElement).toBeInTheDocument();
  });
});
