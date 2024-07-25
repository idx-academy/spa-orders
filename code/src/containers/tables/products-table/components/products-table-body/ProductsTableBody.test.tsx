import { screen } from "@testing-library/react";

import {
  mockProducts,
  productStatuToTranslationKeyMap
} from "@/containers/tables/products-table/ProductsTable.constants";
import ProductsTableBody from "@/containers/tables/products-table/components/products-table-body/ProductsTableBody";

import { ManagerProduct } from "@/types/product.types";
import formatDate from "@/utils/format-date/formatDate";
import formatPrice from "@/utils/format-price/formatPrice";
import getCategoryFromTags from "@/utils/get-category-from-tags/getCategoryFromTags";
import renderWithProviders from "@/utils/render-with-providers/renderWithProviders";

const categoryTag = getCategoryFromTags(mockProducts[0].tags);

const renderWithProduct = (product: ManagerProduct) => {
  renderWithProviders(
    <table>
      <tbody>
        <tr>
          <ProductsTableBody product={product} />
        </tr>
      </tbody>
    </table>
  );
};

describe("Test ProductsTable", () => {
  test("Should be rendered correctly", () => {
    renderWithProduct(mockProducts[0]);
    const imageElement = screen.getByRole("img");
    const nameElement = screen.getByText(mockProducts[0].name);
    const priceElement = screen.getByText(formatPrice(mockProducts[0].price));
    const statusElement = screen.getByText(
      productStatuToTranslationKeyMap[mockProducts[0].status]
    );
    const categoryElement = screen.getByText(`productsAll.${categoryTag}`);
    const dateElement = screen.getByText(formatDate(mockProducts[0].createdAt));

    expect(imageElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(priceElement).toBeInTheDocument();
    expect(statusElement).toBeInTheDocument();
    expect(categoryElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
  });

  test("renders '-' if category is not found", () => {
    renderWithProduct({ ...mockProducts[0], tags: [] });
    const categoryElement = screen.getByText("-");
    expect(categoryElement).toBeInTheDocument();
  });
});
